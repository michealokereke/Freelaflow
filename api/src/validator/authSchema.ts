import z from "zod";
export const authSchema = {
  register: z.object({
    fullName: z.string().min(2).max(255).trim(),
    orgName: z.string().min(2).max(255).trim(),
    password: z.string().min(8).max(255),
    email: z.string().email().trim().lowercase(),
  }),
  login: z.object({
    password: z.string().min(8).max(255),
    email: z.string().email().trim().lowercase(),
  }),

  requestPasswordReset: z.object({
    email: z.string().email().trim().lowercase(),
  }),

  resetPassword: z.object({
    newPassword: z.string().min(8).max(255),
    token: z.string(),
  }),

  verifyEmail: z.object({
    token: z.string(),
  }),

  invites: z.object({
    email: z.string().email().trim().lowercase(),
  }),

  acceptInvites: z.object({
    token: z.string(),
    password: z.string().min(8).max(255),
    fullName: z.string().min(2).max(255).trim(),
  }),
};
