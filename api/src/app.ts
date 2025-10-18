import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { config } from "./config.js";
import { registerRoutes } from "./routes.js";
// import { rateLimiter } from "./common/middleware/rateLimit.middleware";
import { errorHandler } from "./middleware/error.middleware.js";

export const createApp = () => {
  const app = express();

  app.use(helmet());
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(morgan(config.LOG_FORMAT));
  // app.use(rateLimiter);

  app.get("/test", (req, res) => {
    res.json({ message: "test working perfectly" });
  });
  app.use(
    cors({
      origin: config.CLIENT_ORIGINS,
      credentials: true,
    })
  );

  registerRoutes(app);
  app.use(errorHandler);

  return app;
};
