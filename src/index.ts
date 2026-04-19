import "dotenv/config";
import { createServer, type Server as HttpServer } from "http";
import { buildApp } from "./app";
import { DatabaseConfig } from "./config/database";
import {
    connectRedisClusterClients,
    disconnectRedisClusterClients,
    type RedisClusterClients,
} from "./config/redis";
import { SocketServer } from "./socket";
import { closeSocketIo } from "./socket/ioRegistry";
import { logger } from "./utils/logger";

const PORT = Number(process.env.PORT) || 3000;

let server: HttpServer | null = null;
let redis: RedisClusterClients | null = null;
let shuttingDown = false;

async function gracefulShutdown(signal: string): Promise<void> {
    if (shuttingDown) {
        return;
    }
    shuttingDown = true;
    logger.info(`Received ${signal}, shutting down gracefully`);

    const forceExit = setTimeout(() => {
        logger.error("Graceful shutdown timed out, forcing exit");
        process.exit(1);
    }, 30_000);

    try {
        await closeSocketIo();
        if (server) {
            await new Promise<void>((resolve, reject) => {
                server!.close((err) => (err ? reject(err) : resolve()));
            });
            server = null;
        }
        await DatabaseConfig.disconnect();
        await disconnectRedisClusterClients(redis);
        redis = null;
    } catch (err) {
        logger.error("Error during shutdown:", err);
        process.exit(1);
    } finally {
        clearTimeout(forceExit);
    }

    process.exit(0);
}

async function startServer() {
    try {
        await DatabaseConfig.connect();

        try {
            redis = await connectRedisClusterClients();
        } catch (err) {
            logger.error("Redis connection failed, continuing without it", err);
            redis = null;
        }

        const app = await buildApp({
            rateLimitClient: redis?.rateLimitClient,
            redis,
        });

        server = createServer(app);
        SocketServer.initialize(server, redis);

        server.on("error", (err) => {
            logger.error("HTTP server error:", err);
        });

        server.listen(PORT, () => {
            console.log(`Server is running on ${PORT}`);
        });

        process.once("SIGTERM", () => void gracefulShutdown("SIGTERM"));
        process.once("SIGINT", () => void gracefulShutdown("SIGINT"));
    } catch (error) {
        logger.error("Failed to start server, retrying...", error);

        await disconnectRedisClusterClients(redis);
        redis = null;

        if (DatabaseConfig.isReady()) {
            await DatabaseConfig.disconnect();
        }

        setTimeout(startServer, 5000);
    }
}

startServer();
