import type { Express } from "express";
import authRouter from "./modules/auth/route.js";
import clientRouter from "./modules/clients/route.js";
import { authMiddleware } from "./middleware/auth.middleware.js";
import projectRouter from "./modules/projects/route.js";
import taskRouter from "./modules/tasks/route.js";

export const registerRoutes = (app: Express) => {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/clients", authMiddleware, clientRouter);
  app.use("/api/v1/projects", authMiddleware, projectRouter);
  app.use("/api/v1/tasks", authMiddleware, taskRouter);
  // app.use("/health");
  // app.use("/webhooks");
};
