import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import type { RedisClientType } from "redis";
import router from "./routes";
import { ErrorHandlerMiddleware } from "./middlewares/errorHandler";
import { DatabaseConfig } from "./config/database";
import { pingRedis, type RedisClusterClients } from "./config/redis";

export type BuildAppOptions = {
    rateLimitClient?: RedisClientType;
    redis?: RedisClusterClients | null;
};

export async function buildApp(options: BuildAppOptions = {}): Promise<Application> {
    const app = express();

    app.set("trust proxy", 1);

    app.use(helmet());
    app.use(cors({ origin: process.env.FRONTEND_URL || "*", credentials: true }));

    const livePayload = () => ({
        status: "OK" as const,
        checks: { process: "up" as const },
        timestamp: new Date().toISOString(),
    });

    app.get("/health", (_req, res) => {
        res.json(livePayload());
    });

    app.get("/health/live", (_req, res) => {
        res.json(livePayload());
    });

    app.get("/health/ready", async (_req, res) => {
        const mongoOk = DatabaseConfig.isReady();
        let redisOk = true;
        let redisSkipped = false;

        if (process.env.REDIS_URL?.trim()) {
            if (!options.redis) {
                redisOk = false;
            } else {
                try {
                    await pingRedis(options.redis);
                    redisOk = true;
                } catch {
                    redisOk = false;
                }
            }
        } else {
            redisSkipped = true;
        }

        const ready = mongoOk && redisOk;
        res.status(ready ? 200 : 503).json({
            status: ready ? "OK" : "SERVICE_UNAVAILABLE",
            checks: {
                mongodb: mongoOk ? "up" : "down",
                redis: redisSkipped ? "not_configured" : redisOk ? "up" : "down",
            },
            timestamp: new Date().toISOString(),
        });
    });

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

    app.use(ErrorHandlerMiddleware.handle);

    app.use("*", (req, res) => {
        res.status(404).json({ message: "Route not found" });
    });

    return app;
}
