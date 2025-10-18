import type { Response } from "express";
import { prisma } from "../../db/prisma.js";
import { bcryptFunc } from "../../utils/bcryptjs.js";
import { clearAuthCookies, clearCookies } from "../../utils/cookies.js";
import { crypto } from "../../utils/crypto.js";
import { errorFormat } from "../../utils/errorFormat.js";
import { jwt } from "../../utils/jwt.js";
import { DateTime, DateTime as dt } from "luxon";
import { sendEmail } from "../../config/nodemailer.js";
import { emailTemplate } from "../../utils/EmailTemplate.js";
import { ACTIVE_ORIGIN } from "../../utils/emv.js";

export const authService = {
  ////////////////////////////////////////////////////////////////////////////  LOGIN SERVICE  //////////////////////////////////////////////////////////////////////////////
  login: async (payload: { email: string; password: string }) => {
    const { email, password } = payload;
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        organizationId: true,
        role: true,
        email: true,
        passwordHash: true,
      },
    });
    if (!user) throw errorFormat("Invalid credentials", 409);

    const ok = await bcryptFunc.compareValue(password, user.passwordHash);
    if (!ok) throw errorFormat("Invalid credentials", 409);

    const accessToken = jwt.signAccessToken({
      sub: user.id,
      org: user.organizationId,
      role: user.role,
    });
    const tid = crypto.generateToken();
    const refreshToken = jwt.signRefreshToken({ tid });
    const tokenHash = crypto.sha256(refreshToken);
    const now = dt.utc();
    const expiresAt = now.plus({ days: 30 }).toJSDate();

    await prisma.refreshToken.create({
      data: {
        tid,
        userId: user.id,
        tokenHash,
        expiresAt,
      },
    });

    const { passwordHash, ...returnedUser } = user;
    return { accessToken, refreshToken, user: returnedUser };
  },

  ////////////////////////////////////////////////////////////////////////////  REFRESH SERVICE  //////////////////////////////////////////////////////////////////////////////
  refresh: async (payload: { res: Response; reqRefreshToken: string }) => {
    const { res, reqRefreshToken } = payload;

    if (!reqRefreshToken) {
      clearAuthCookies(res);
      throw errorFormat("refresh Token not found ", 401);
    }

    const decoded = jwt.verifyRefreshToken(reqRefreshToken);

    if (!decoded || typeof decoded === "string") {
      clearAuthCookies(res);
      throw errorFormat("invalid token", 401);
    }

    const tokenHash = crypto.sha256(reqRefreshToken);

    const DBRefreshToken = await prisma.refreshToken.findFirst({
      where: {
        tokenHash,
      },
    });
    if (!DBRefreshToken) {
      clearAuthCookies(res);
      throw errorFormat("refresh Token not found", 401);
    }

    if (decoded.tid !== DBRefreshToken.tid) {
      clearAuthCookies(res);
      throw errorFormat("token mismatch", 401);
    }

    if (
      DBRefreshToken?.revoked ||
      DBRefreshToken?.expiresAt <= dt.utc().toJSDate()
    ) {
      clearAuthCookies(res);
      throw errorFormat("refresh Token expired", 401);
    }

    const tid = crypto.generateToken();
    const newRefreshToken = jwt.signRefreshToken({ tid });
    const newTokenHash = crypto.sha256(newRefreshToken);

    const [, , user] = await prisma.$transaction([
      prisma.refreshToken.create({
        data: {
          tid,
          userId: DBRefreshToken.userId,
          tokenHash: newTokenHash,
          expiresAt: dt.utc().plus({ days: 30 }).toJSDate(),
        },
      }),
      prisma.refreshToken.update({
        where: { id: DBRefreshToken.id },
        data: { revoked: true },
      }),
      prisma.user.findFirst({
        where: { id: DBRefreshToken.userId },
        select: {
          id: true,
          organizationId: true,
          role: true,
          email: true,
        },
      }),
    ]);

    if (!user) {
      clearCookies(res, "freelaflow_access");
      clearCookies(res, "freelaflow_refresh");
      throw errorFormat("no user found", 401);
    }
    const accessToken = jwt.signAccessToken({
      sub: user.id,
      org: user.organizationId,
      role: user.role,
    });

    return { accessToken, refreshToken: newRefreshToken, user };
  },

  ////////////////////////////////////////////////////////////////////////////  REGISTER SERVICE  //////////////////////////////////////////////////////////////////////////////
  register: async (payload: {
    orgName: string;
    fullName: string;
    email: string;
    password: string;
  }) => {
    const { orgName, fullName, email, password } = payload;
    const userExist = await prisma.user.findUnique({ where: { email } });
    if (userExist) throw errorFormat("user already exist with this email", 409);

    const passwordHash = await bcryptFunc.hashValue(password, 12);
    const tid = crypto.generateToken();
    const refreshToken = jwt.signRefreshToken({ tid });
    const tokenHash = crypto.sha256(refreshToken);
    const now = dt.utc();
    const expiresAt = now.plus({ days: 30 }).toJSDate();
    const verificationToken = crypto.generateToken();
    const verificationTokenHash = crypto.sha256(verificationToken);
    const verificationExpiresAt = DateTime.utc()
      .plus({ minutes: 30 })
      .toJSDate();

    const newOrg = await prisma.organization.create({
      data: {
        name: orgName,
        users: {
          create: {
            fullName,
            email,
            verificationTokenHash,
            verificationExpiresAt,
            passwordHash,
            role: "OWNER",
            refreshTokens: {
              create: {
                tokenHash,
                tid,
                expiresAt,
              },
            },
          },
        },
      },
      select: {
        users: {
          select: {
            id: true,
            email: true,
            role: true,
            fullName: true,
            organizationId: true,
          },
        },
      },
    });

    if (!newOrg || newOrg.users.length === 0)
      throw errorFormat("error creating user", 500);

    const newUser = newOrg.users[0];

    const verificationUrl = `${ACTIVE_ORIGIN}/verify-email?token=${encodeURIComponent(
      verificationToken
    )}`;

    await sendEmail(
      email,
      "Verify Email - Freelaflow",
      emailTemplate.Auth.verify.html
        .replace("{{name}}", newUser?.fullName!)
        .replace("{{verificationLink}}", verificationUrl),
      emailTemplate.Auth.verify.text
        .replace("{{name}}", newUser?.fullName!)
        .replace("{{verificationLink}}", verificationUrl)
    );

    const accessToken = jwt.signAccessToken({
      sub: newUser?.id as string,
      org: newUser?.organizationId as string,
      role: newUser?.role as string,
    });

    return { refreshToken, accessToken, user: newUser };
  },

  //////////////////////////////////////////////////////////////////////////// ACCEPT INVITES SERVICE  //////////////////////////////////////////////////////////////////////////////

  acceptInvites: async (payload: {
    token: string;
    fullName: string;
    password: string;
  }) => {
    const { token, fullName, password } = payload;
    const tokenHash = crypto.sha256(token);
    const now = DateTime.utc().toJSDate();
    const tid = crypto.generateToken();
    const refreshToken = jwt.signRefreshToken({ tid });
    const refreshTokenHash = crypto.sha256(refreshToken);

    const expiresAt = DateTime.utc().plus({ days: 30 }).toJSDate();

    const passwordHash = await bcryptFunc.hashValue(password);

    const user = await prisma.$transaction(async (tx) => {
      const inviteToken = await tx.invite.findUnique({
        where: { token: tokenHash },
      });

      if (!inviteToken || inviteToken.accepted || inviteToken.expiresAt <= now)
        throw errorFormat(
          "No token or tokem has been used or token expired",
          400
        );

      const user = await tx.user.create({
        data: {
          fullName,
          email: inviteToken.email,
          verificationExpiresAt: now,
          passwordHash,
          role: inviteToken.role,
          organizationId: inviteToken.organizationId,
          refreshTokens: {
            create: {
              tokenHash: refreshTokenHash,
              tid,
              expiresAt,
            },
          },
        },

        select: {
          id: true,
          fullName: true,
          emailVerified: true,
          email: true,
          role: true,
          organizationId: true,
        },
      });

      return user;
    });

    if (!user) throw errorFormat("error creating user", 400);

    const accessToken = jwt.signAccessToken({
      sub: user?.id,
      org: user?.organizationId,
      role: user?.role,
    });
    return { refreshToken, accessToken, user };
  },

  ////////////////////////////////////////////////////////////////////////////  LOGOUT SERVICE  //////////////////////////////////////////////////////////////////////////////

  logout: async (reqRefreshToken: string) => {
    const tokenHash = crypto.sha256(reqRefreshToken);

    await prisma.refreshToken.updateMany({
      where: { tokenHash },
      data: { revoked: true },
    });
  },

  me: async (userInfo: { sub: string; org: string; role: string }) => {
    const user = await prisma.user.findUnique({
      where: { id: userInfo.sub },
      select: {
        id: true,
        email: true,
        role: true,
        organizationId: true,
      },
    });
    if (!user) throw errorFormat("user not found", 404);

    return user;
  },

  ////////////////////////////////////////////////////////////////////////////  REQUEST PASSWORD RESET SERVICE  //////////////////////////////////////////////////////////////////////////////

  requestPasswordReset: async (email: string) => {
    const passwordResetToken = crypto.generateToken();
    const tokenHash = crypto.sha256(passwordResetToken);
    const expiresAt = DateTime.utc().plus({ minutes: 30 }).toJSDate();
    const now = DateTime.utc().toJSDate();

    const [user, resetRequest] = await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { email },
        select: {
          email: true,
          fullName: true,
          id: true,
          role: true,
        },
      });

      if (!user) {
        throw errorFormat("User not found", 400);
      }

      await tx.passwordResetRequest.updateMany({
        where: {
          userId: user.id,
          used: false,
          expiresAt: { gt: now },
        },
        data: {
          used: true,
          usedAt: now,
        },
      });

      const resetRequest = await tx.passwordResetRequest.create({
        data: {
          userId: user.id,
          tokenHash,
          expiresAt,
        },
      });

      return [user, resetRequest];
    });

    const resetUrl = `${ACTIVE_ORIGIN}/reset-password?token=${encodeURIComponent(
      passwordResetToken
    )}`;

    await sendEmail(
      email,
      "Reset Your Password – Freelaflow",
      emailTemplate.Auth.forgotPassword.html
        .replace("{{name}}", user.fullName!)
        .replace("{{resetLink}}", resetUrl),
      emailTemplate.Auth.forgotPassword.text
        .replace("{{name}}", user.fullName!)
        .replace("{{resetLink}}", resetUrl)
    );

    return { user };
    // send mail
  },

  ////////////////////////////////////////////////////////////////////////////  RESET PASSWORD SERVICE  //////////////////////////////////////////////////////////////////////////////

  resetPassword: async (token: string, newPassword: string) => {
    const tokenHash = crypto.sha256(token);
    const now = DateTime.utc().toJSDate();
    const passwordHash = await bcryptFunc.hashValue(newPassword);

    const user = await prisma.$transaction(async (tx) => {
      const resetRequest = await tx.passwordResetRequest.findUnique({
        where: { tokenHash },
      });
      if (!resetRequest) throw errorFormat("No token generated", 400);
      if (
        resetRequest.used ||
        resetRequest.usedAt ||
        resetRequest.expiresAt <= now
      )
        throw errorFormat("Token is expired or has already been used", 409);

      await tx.passwordResetRequest.update({
        where: { tokenHash },
        data: { used: true, usedAt: now },
      });

      const user = await tx.user.update({
        where: { id: resetRequest.userId },
        data: { passwordHash },
        select: {
          id: true,
          role: true,
          email: true,
          fullName: true,
        },
      });

      return user;
    });

    await sendEmail(
      user.email,
      "Your Password Has Been Changed – Freelaflow",
      emailTemplate.Auth.resetPassword.html.replace("{{name}}", user.fullName!),
      emailTemplate.Auth.resetPassword.text.replace("{{name}}", user.fullName!)
    );

    return user;
  },
  ////////////////////////////////////////////////////////////////////////////  VERIFY EMAIL SERVICE  //////////////////////////////////////////////////////////////////////////////

  verifyEmail: async (token: string) => {
    const tokenHash = crypto.sha256(token);
    const now = DateTime.utc().toJSDate();

    const verifiedUser = await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({
        where: { verificationTokenHash: tokenHash },
      });

      if (!user) throw errorFormat("No user exist with this token", 400);

      if (user.emailVerified || user.verificationExpiresAt! <= now)
        throw errorFormat("user already verifield or token has expired", 400);

      const verifiedUser = await tx.user.update({
        where: { verificationTokenHash: tokenHash },
        data: {
          emailVerified: true,
          verificationTokenHash: null,
          verificationExpiresAt: now,
        },
        select: {
          email: true,
          role: true,
          fullName: true,
          emailVerified: true,
          id: true,
        },
      });

      return verifiedUser;
    });

    return verifiedUser;
  },

  //////////////////////////////////////////////////////////////////////////// INVITES SERVICE  //////////////////////////////////////////////////////////////////////////////

  invites: async (role: string, email: string, id: string, org: string) => {
    if (!role || role !== "OWNER")
      throw errorFormat("unAuthorized to perform this operation", 400);

    const randomInviteToken = crypto.generateToken();
    const inviteTokenHash = crypto.sha256(randomInviteToken);
    const expiresAt = DateTime.utc().plus({ days: 7 }).toJSDate();

    const { organization, user, inviteToken } = await prisma.$transaction(
      async (tx) => {
        const user = await tx.user.findUnique({ where: { id } });

        if (!user || user.role === "OWNER")
          throw errorFormat("unAuthorized to perform this operation", 401);

        const organization = await tx.organization.findUnique({
          where: { id: user.organizationId },
          select: { name: true, id: true },
        });

        const exist = await tx.organization.findFirst({
          where: {
            users: {
              some: { email },
            },
          },
        });

        if (exist)
          throw errorFormat("user is already in this organization", 400);

        if (!organization) throw errorFormat("no organization found", 400);

        const inviteToken = await tx.invite.create({
          data: {
            organizationId: organization.id,
            email,
            token: inviteTokenHash,
            expiresAt,
          },
        });
        return { organization, user, inviteToken };
      }
    );

    const invitationUrl = `${ACTIVE_ORIGIN}/invites?token=${encodeURIComponent(
      randomInviteToken
    )}`;

    await sendEmail(
      inviteToken.email,
      `${user.fullName} invited you to join ${organization.name} – Freelaflow`,
      emailTemplate.Auth.orgInvite.html
        .replace("{{name}}", "")
        .replace("{{organization}}", organization.name)
        .replace("{{inviterName}}", user.fullName!)
        .replace("{{invitationLink}}", invitationUrl),
      emailTemplate.Auth.orgInvite.text
        .replace("{{name}}", "")
        .replace("{{organization}}", organization.name)
        .replace("{{inviterName}}", user.fullName!)
        .replace("{{invitationLink}}", invitationUrl)
    );

    return { organization, user };
  },
};
