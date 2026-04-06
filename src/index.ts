import "dotenv/config";
import { createServer } from "http";
import app from "./app";
import { DatabaseConfig } from "./config/database";
import { SocketServer } from "./socket";
import { logger } from "./utils/logger";

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await DatabaseConfig.connect();

        const server = createServer(app);
        SocketServer.initialize(server);

        server.listen(PORT, () => {
            logger.info(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        logger.error("Failed to start server:", error);
        process.exit(1);
    }
}

startServer();
