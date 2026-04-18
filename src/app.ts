import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import type { RedisClientType } from "redis";
import router from "./routes";
import { ErrorHandlerMiddleware } from "./middlewares/errorHandler";

export type BuildAppOptions = {
    rateLimitClient?: RedisClientType;
};

export async function buildApp(options: BuildAppOptions = {}): Promise<Application> {
    const app = express();

    app.set("trust proxy", 1);

    app.use(helmet());
    app.use(cors({ origin: process.env.FRONTEND_URL || "*", credentials: true }));

    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 1000,
        standardHeaders: true,
        legacyHeaders: false,
        ...(options.rateLimitClient
            ? {
                  store: new RedisStore({
                      prefix: "rl:",
                      sendCommand: (...args: string[]) =>
                          options.rateLimitClient!.sendCommand(args as never),
                  }),
              }
            : {}),
    });
    app.use(limiter);

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use("/api/v1", router);

    app.get("/health", (req, res) => {
        res.json({ status: "OK", timestamp: new Date().toISOString() });
    });

    app.use(ErrorHandlerMiddleware.handle);

    app.use("*", (req, res) => {
        res.status(404).json({ message: "Route not found" });
    });

    return app;
}
