import { Socket } from "socket.io";
import { ChatService } from "../services/ChatService";

export class ChatSocket {
    static async handleConnection(socket: Socket): Promise<void> {
        const user = (socket as any).user;
        const userId = user?.id;

        socket.on("joinRoom", (roomId: string) => {
            if (!roomId) {
                socket.emit("error", { message: "roomId is required" });
                return;
            }
            socket.join(roomId);
            socket.emit("roomJoined", { roomId });
        });

        socket.on("leaveRoom", (roomId: string) => {
            socket.leave(roomId);
            socket.emit("roomLeft", { roomId });
        });

        socket.on("chatMessage", async (payload: { roomId: string; text: string }) => {
            try {
                if (!payload?.roomId || !payload?.text) {
                    socket.emit("error", { message: "roomId and text are required" });
                    return;
                }

                if (!userId) {
                    socket.emit("error", { message: "Authentication required" });
                    return;
                }

                const message = await ChatService.sendMessage(payload.roomId, userId, payload.text);
                socket.to(payload.roomId).emit("message", message);
                socket.emit("message", message);
            } catch (error) {
                socket.emit("error", { message: "Failed to send message" });
            }
        });

        socket.on("disconnect", (reason) => {
            socket.rooms.forEach((room) => {
                if (room !== socket.id) {
                    socket.leave(room);
                }
            });
        });
    }
}
