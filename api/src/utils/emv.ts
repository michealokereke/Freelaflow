import { errorFormat } from "./errorFormat.js";

const getEnv = (value: string, defaultValue?: string) => {
  const envValue = process.env[value] || defaultValue;
  if (!envValue) throw errorFormat(`${value} value not found`, 500);
  return envValue;
};

export const PORT = getEnv("PORT", "4000");
const CLIENT_ORIGIN_CONBINED = getEnv("CLIENT_ORIGINS");
export const CLIENT_ORIGINS = CLIENT_ORIGIN_CONBINED.split(",");
export const ACCESS_TOKEN_EXPIRES_IN = getEnv("ACCESS_TOKEN_EXPIRES_IN");
export const REFRESH_TOKEN_EXPIRES_DAYS = getEnv("REFRESH_TOKEN_EXPIRES_DAYS");
export const NODE_ENV = getEnv("NODE_ENV");
export const JWT_ACCESS_TOKEN_SECRET = getEnv("JWT_ACCESS_TOKEN_SECRET");
export const JWT_REFRESH_TOKEN_SECRET = getEnv("JWT_REFRESH_TOKEN_SECRET");
export const APP_EMAIL_PASS = getEnv("APP_EMAIL_PASS");
export const EMAIL_SENDER = getEnv("EMAIL_SENDER");
export const ACTIVE_ORIGIN = getEnv("ACTIVE_ORIGIN");
