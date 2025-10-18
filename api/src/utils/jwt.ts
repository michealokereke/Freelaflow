import jwtkn from "jsonwebtoken";
import { JWT_ACCESS_TOKEN_SECRET, JWT_REFRESH_TOKEN_SECRET } from "./emv.js";

export const jwt = {
  signAccessToken: (payload: { sub: string; org: string; role: string }) =>
    jwtkn.sign(payload, JWT_ACCESS_TOKEN_SECRET, {
      expiresIn: "15m",
    }),
  signRefreshToken: (payload: { tid: string }) =>
    jwtkn.sign(payload, JWT_REFRESH_TOKEN_SECRET, { expiresIn: "30d" }),

  verifyRefreshToken: (token: string) =>
    jwtkn.verify(token, JWT_REFRESH_TOKEN_SECRET),
  verifyAccessToken: (token: string) =>
    jwtkn.verify(token, JWT_ACCESS_TOKEN_SECRET),
};
