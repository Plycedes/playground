import "dotenv/config";
import { createServer } from "http";
import app from "./app";
import { DatabaseConfig } from "./config/database";
import { SocketServer } from "./socket";
import { logger } from "./utils/logger";

const PORT = Number(process.env.PORT) || 3000;

async function startServer() {
    try {
        await DatabaseConfig.connect();

        const server = createServer(app);
        SocketServer.initialize(server);

        server.on("error", (err) => {
            logger.error("HTTP server error:", err);
            process.exit(1);
        });

        server.listen(PORT, () => {
            console.log(`Server is running on ${PORT}`);
        });
    } catch (error) {
        logger.error("Failed to start server:", error);
        process.exit(1);
    }
}

startServer();
