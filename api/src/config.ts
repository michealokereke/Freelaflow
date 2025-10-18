import { CLIENT_ORIGINS, NODE_ENV, PORT } from "./utils/emv.js";

export const config = {
  PORT,
  LOG_FORMAT: NODE_ENV === "development" ? "dev" : "combined",
  CLIENT_ORIGINS,
};
