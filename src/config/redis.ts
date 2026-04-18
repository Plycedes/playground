import { createClient, type RedisClientType } from "redis";
import { logger } from "../utils/logger";

export type RedisClusterClients = {
    pubClient: RedisClientType;
    subClient: RedisClientType;
    rateLimitClient: RedisClientType;
};

/**
 * When `REDIS_URL` is set, creates three connections: pub/sub for the Socket.IO
 * Redis adapter and a separate client for express-rate-limit (must not share a
 * connection that enters subscribed mode).
 */
export async function connectRedisClusterClients(): Promise<RedisClusterClients | null> {
    const url = process.env.REDIS_URL?.trim();
    if (!url) {
        logger.warn(
            "REDIS_URL is not set: Socket.IO uses the default in-memory adapter and rate limits use process memory. Set REDIS_URL to run multiple API replicas safely."
        );
        return null;
    }

    const pubClient = createClient({ url }) as RedisClientType;
    const subClient = pubClient.duplicate();
    const rateLimitClient = pubClient.duplicate();

    const logClientError =
        (label: string) =>
        (err: unknown): void => {
            logger.error(`Redis ${label} client error:`, err);
        };

    pubClient.on("error", logClientError("pub"));
    subClient.on("error", logClientError("sub"));
    rateLimitClient.on("error", logClientError("rateLimit"));

    await Promise.all([pubClient.connect(), subClient.connect(), rateLimitClient.connect()]);
    logger.info("Redis connected (Socket.IO adapter + rate limit store)");
    return { pubClient, subClient, rateLimitClient };
}

export async function disconnectRedisClusterClients(clients: RedisClusterClients | null): Promise<void> {
    if (!clients) {
        return;
    }
    await Promise.all([
        clients.pubClient.quit(),
        clients.subClient.quit(),
        clients.rateLimitClient.quit(),
    ]);
}

export async function pingRedis(clients: RedisClusterClients): Promise<void> {
    const pong = await clients.rateLimitClient.ping();
    if (pong !== "PONG") {
        throw new Error("Redis PING did not return PONG");
    }
}
