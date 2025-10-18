import type { Request, Response, NextFunction, RequestHandler } from "express";
import { authService } from "./auth.service.js";
import {
  clearAuthCookies,
  clearCookies,
  setCookies,
} from "../../utils/cookies.js";
import { REFRESH_TOKEN_EXPIRES_DAYS } from "../../utils/emv.js";
import type { AuthUser } from "../../middleware/auth.middleware.js";

//////////////////////////////////////////////////////////////////////////// LOGIN CONTROLLER  //////////////////////////////////////////////////////////////////////////////

export const login: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;
  const { accessToken, refreshToken, user } = await authService.login({
    email,
    password,
  });

  setCookies(
    res,
    "freelaflow_refresh",
    refreshToken,
    1000 * 60 * 60 * 24 * Number(REFRESH_TOKEN_EXPIRES_DAYS || 30)
  );
  setCookies(res, "freelaflow_access", accessToken, 1000 * 60 * 15);

  res.status(200).json({ message: "user signed in successfully", user });
};

//////////////////////////////////////////////////////////////////////////// REGISTER CONTROLLER  //////////////////////////////////////////////////////////////////////////////

export const register: RequestHandler = async (req, res, next) => {
  const { orgName, fullName, email, password } = req.body;

  const { accessToken, refreshToken, user } = await authService.register({
    orgName,
    fullName,
    email,
    password,
  });
  setCookies(
    res,
    "freelaflow_refresh",
    refreshToken,
    1000 * 60 * 60 * 24 * Number(REFRESH_TOKEN_EXPIRES_DAYS || 30)
  );
  setCookies(res, "freelaflow_access", accessToken, 1000 * 60 * 15);

  res.status(201).json({ message: "user created successfully", user });
};

//////////////////////////////////////////////////////////////////////////// REFRESH CONTROLLER  //////////////////////////////////////////////////////////////////////////////

export const refresh: RequestHandler = async (req, res, next) => {
  const reqRefreshToken = req.cookies.freelaflow_refresh;

  const { accessToken, refreshToken, user } = await authService.refresh({
    res,
    reqRefreshToken,
  });

  setCookies(
    res,
    "freelaflow_refresh",
    refreshToken,
    1000 * 60 * 60 * 24 * Number(REFRESH_TOKEN_EXPIRES_DAYS || 30)
  );
  setCookies(res, "freelaflow_access", accessToken, 1000 * 60 * 15);

  res.status(201).json({ message: "token rotated successfully", user });
};

//////////////////////////////////////////////////////////////////////////// LOGOUT CONTROLLER  //////////////////////////////////////////////////////////////////////////////

export const logout: RequestHandler = async (req, res, next) => {
  const reqRefreshToken = req.cookies.freelaflow_refresh;
  try {
    await authService.logout(reqRefreshToken);
  } catch (error) {}
  clearAuthCookies(res);

  res.status(200).json({ message: "user logged out successfully" });
};

//////////////////////////////////////////////////////////////////////////// ME CONTROLLER  //////////////////////////////////////////////////////////////////////////////

export const me: RequestHandler = async (req: AuthUser, res, next) => {
  const { userInfo } = req.user;

  const user = await authService.me(userInfo);

  res.json({ message: "user gotten successfully", user });
};

//////////////////////////////////////////////////////////////////////////// REQUEST PASSWORD RESET CONTROLLER  //////////////////////////////////////////////////////////////////////////////

export const requestPasswordReset: RequestHandler = async (req, res, next) => {
  const { email } = req.body;

  const user = await authService.requestPasswordReset(email);
  res.status(200).json({
    message: "user requested for password reset successfully",
    user,
  });
};
//////////////////////////////////////////////////////////////////////////// RESET PASSWORD CONTROLLER  //////////////////////////////////////////////////////////////////////////////

export const resetPassword: RequestHandler = async (req, res, next) => {
  const { newPassword, token } = req.body;

  const user = await authService.resetPassword(token, newPassword);

  res.status(200).json({ message: "Password changed successfully", user });
};

//////////////////////////////////////////////////////////////////////////// VERIFY EMAIL CONTROLLER  //////////////////////////////////////////////////////////////////////////////

export const verifyEmail: RequestHandler = async (req, res, next) => {
  const { token } = req.body;
  const user = await authService.verifyEmail(token);

  res.status(200).json({ message: "User email verified", user });
};

//////////////////////////////////////////////////////////////////////////// INVITES CONTROLLER  //////////////////////////////////////////////////////////////////////////////

export const invites: RequestHandler = async (req: AuthUser, res, next) => {
  const { sub, org, role } = req.user;
  const { email } = req.body;

  const { organization, user } = await authService.invites(
    role,
    email,
    sub,
    org
  );

  res.status(200).json({
    message: `invite link succesfully sent to ${email}`,
  });
};

//////////////////////////////////////////////////////////////////////////// ACCEPT INVITES CONTROLLER  //////////////////////////////////////////////////////////////////////////////

export const acceptInvites: RequestHandler = async (req, res, next) => {
  const { token, fullName, password } = req.body;

  const { refreshToken, accessToken, user } = await authService.acceptInvites({
    token,
    fullName,
    password,
  });

  setCookies(
    res,
    "freelaflow_refresh",
    refreshToken,
    1000 * 60 * 60 * 24 * Number(REFRESH_TOKEN_EXPIRES_DAYS || 30)
  );
  setCookies(res, "freelaflow_access", accessToken, 1000 * 60 * 15);

  res.status(201).json({ message: "user accepted invites successfully", user });
};
