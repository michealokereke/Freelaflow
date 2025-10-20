import type { Response } from "express";
import { NODE_ENV } from "./emv.js";

const isProd = NODE_ENV === "production";
export const setCookies = (
  res: Response,
  name: string,
  token: string,
  expires: number
) => {
  res.cookie(name, token, {
    secure: isProd,
    httpOnly: true,
    sameSite: isProd ? "none" : "lax",
    path: "/",
    maxAge: expires,
  });
};

export const clearCookies = (res: Response, name: string) => {
  res.clearCookie(name, {
    secure: isProd,
    httpOnly: true,
    sameSite: isProd ? "none" : "lax",
    path: "/",
  });
};

export const clearAuthCookies = (res: Response) => {
  clearCookies(res, "freelaflow_access");
  clearCookies(res, "freelaflow_refresh");
};
