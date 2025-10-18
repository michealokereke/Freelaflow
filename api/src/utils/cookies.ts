import type { Response } from "express";
import { NODE_ENV } from "./emv.js";

export const setCookies = (
  res: Response,
  name: string,
  token: string,
  expires: number
) => {
  res.cookie(name, token, {
    secure: NODE_ENV === "production",
    httpOnly: true,
    sameSite: "strict",
    path: "/",
    maxAge: expires,
  });
};

export const clearCookies = (res: Response, name: string) => {
  res.clearCookie(name, {
    secure: NODE_ENV === "production",
    httpOnly: true,
    sameSite: "strict",
    path: "/",
  });
};

export const clearAuthCookies = (res: Response) => {
  clearCookies(res, "freelaflow_access");
  clearCookies(res, "freelaflow_refresh");
};
