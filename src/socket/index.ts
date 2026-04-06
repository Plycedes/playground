import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";
import jwt from "jsonwebtoken";
import { JWT_CONFIG } from "../config/auth";
import { ChatSocket } from "./ChatSocket";
import { logger } from "../utils/logger";

export class SocketServer {
    static initialize(server: HttpServer): Server {
        const io = new Server(server, {
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

        io.use((socket: Socket, next) => {
            const token =
                socket.handshake.auth?.token ||
                socket.handshake.headers.authorization?.toString().replace("Bearer ", "");
            if (!token) {
                return next(new Error("Authentication error"));
            }

            try {
                const decoded = jwt.verify(token, JWT_CONFIG.SECRET as string);
                (socket as any).user = decoded;
                next();
            } catch (err) {
                return next(new Error("Authentication error"));
            }
        });

        io.on("connection", (socket: Socket) => {
            logger.info(`Socket connected: ${socket.id}`);
            ChatSocket.handleConnection(socket);
        });

        return io;
    }
}
