import type { Express } from "express";
import authRouter from "./modules/auth/route.js";

export const registerRoutes = (app: Express) => {
  app.use("/api/v1/auth", authRouter);
  // app.use("/health");
  // app.use("/webhooks");
};
