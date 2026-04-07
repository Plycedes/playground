"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const http_1 = require("http");
const app_1 = __importDefault(require("./app"));
const database_1 = require("./config/database");
const socket_1 = require("./socket");
const logger_1 = require("./utils/logger");
const PORT = process.env.PORT || 3000;
async function startServer() {
    try {
        await database_1.DatabaseConfig.connect();
        const server = (0, http_1.createServer)(app_1.default);
        socket_1.SocketServer.initialize(server);
        server.listen(PORT, () => {
            logger_1.logger.info(`Server is running on port ${PORT}`);
        });
    }
    catch (error) {
        logger_1.logger.error("Failed to start server:", error);
        process.exit(1);
    }
}
startServer();
//# sourceMappingURL=index.js.map