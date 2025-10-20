import express from "express";
import helmet from "helmet";
import cors, { type CorsOptions } from "cors";
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

  app.get("/", (req, res) => {
    res.json({ message: "server working perfectly" });
  });

  const corsOptions: CorsOptions = {
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (config.CLIENT_ORIGINS.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  };

  app.use(cors(corsOptions));

  registerRoutes(app);
  app.use(errorHandler);

  return app;
};
