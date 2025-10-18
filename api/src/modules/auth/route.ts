import { Router } from "express";
import { requestErrorCatcher } from "../../utils/generalErrorcatcher.js";
import {
  login,
  refresh,
  register,
  logout,
  me,
  requestPasswordReset,
  verifyEmail,
  resetPassword,
  invites,
  acceptInvites,
} from "./auth.controller.js";
import schemaValidator from "../../middleware/schema.validator.js";
import { authSchema } from "../../validator/authSchema.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const authRouter = Router();

authRouter.post(
  "/register",
  schemaValidator(authSchema.register),
  requestErrorCatcher(register)
);
authRouter.post(
  "/login",
  schemaValidator(authSchema.login),
  requestErrorCatcher(login)
);
authRouter.post("/refresh", requestErrorCatcher(refresh));
authRouter.post("/logout", requestErrorCatcher(logout));
authRouter.get("/me", authMiddleware, requestErrorCatcher(me));
authRouter.post(
  "/request-password-reset",
  schemaValidator(authSchema.requestPasswordReset),
  requestErrorCatcher(requestPasswordReset)
);
authRouter.post(
  "/reset-password",
  schemaValidator(authSchema.resetPassword),
  requestErrorCatcher(resetPassword)
);
authRouter.post(
  "/verify-email",
  schemaValidator(authSchema.verifyEmail),
  requestErrorCatcher(verifyEmail)
);
authRouter.post(
  "/invites",
  schemaValidator(authSchema.invites),
  authMiddleware,
  requestErrorCatcher(invites)
);

authRouter.post(
  "/accept-invites",
  schemaValidator(authSchema.acceptInvites),
  requestErrorCatcher(acceptInvites)
);
export default authRouter;
