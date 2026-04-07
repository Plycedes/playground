"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketServer = void 0;
const socket_io_1 = require("socket.io");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("../config/auth");
const ChatSocket_1 = require("./ChatSocket");
const logger_1 = require("../utils/logger");
class SocketServer {
    static initialize(server) {
        const io = new socket_io_1.Server(server, {
            cors: {
                origin: process.env.FRONTEND_URL || "*",
                methods: ["GET", "POST"],
                credentials: true,
            },
            pingInterval: 25000,
            pingTimeout: 60000,
            maxHttpBufferSize: 1e6,
            transports: ["websocket", "polling"],
        });
        io.use((socket, next) => {
            const token = socket.handshake.auth?.token ||
                socket.handshake.headers.authorization?.toString().replace("Bearer ", "");
            if (!token) {
                return next(new Error("Authentication error"));
            }
            try {
                const decoded = jsonwebtoken_1.default.verify(token, auth_1.JWT_CONFIG.SECRET);
                socket.user = decoded;
                next();
            }
            catch (err) {
                return next(new Error("Authentication error"));
            }
        });
        io.on("connection", (socket) => {
            logger_1.logger.info(`Socket connected: ${socket.id}`);
            ChatSocket_1.ChatSocket.handleConnection(socket);
        });
        return io;
    }
}
exports.SocketServer = SocketServer;
//# sourceMappingURL=index.js.map