import type { NextFunction, Request, RequestHandler, Response } from "express";
import { jwt } from "../utils/jwt.js";
import { errorFormat } from "../utils/errorFormat.js";

export interface AuthUser extends Request {
  user?: any;
}

export const authMiddleware = (
  req: AuthUser,
  res: Response,
  next: NextFunction
) => {
  const reqAccessToken = req.cookies.freelaflow_access;
  const decoded = jwt.verifyAccessToken(reqAccessToken);
  if (!decoded || typeof decoded === "string")
    throw errorFormat("invalid token", 401);
  const { sub, org, role } = decoded;
  req.user = { sub, org, role };

  next();
};
