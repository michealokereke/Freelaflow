import type { Request, RequestHandler } from "express";
import { jwt } from "../utils/jwt.js";
import { errorFormat } from "../utils/errorFormat.js";

export interface AuthUser extends Request {
  user?: any;
}

export const authMiddleware: RequestHandler = (req: AuthUser, res, next) => {
  const reqAccessToken = req.cookies.freelaflow_access;

  try {
    const decoded = jwt.verifyAccessToken(reqAccessToken);

    if (!decoded || typeof decoded === "string")
      throw errorFormat("invalid token", 401);
    const { sub, org, role } = decoded;
    req.user = { sub, org, role };
  } catch (error) {
    throw errorFormat("invalid token", 401);
  }

  next();
};
