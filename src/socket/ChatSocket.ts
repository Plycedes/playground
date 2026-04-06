import { Socket } from "socket.io";
import { ChatService } from "../services/ChatService";

export class ChatSocket {
    static async handleConnection(socket: Socket): Promise<void> {
        const user = (socket as any).user;
        const userId = user?.id;

        socket.on("joinRoom", async (chatId: string) => {
            try {
                if (!chatId) {
                    socket.emit("error", { message: "chatId is required" });
                    return;
                }
                if (!userId) {
                    socket.emit("error", { message: "Authentication required" });
                    return;
                }
                // Check if user is member
                await ChatService.getChatById(chatId, userId);
                socket.join(chatId);
                socket.emit("roomJoined", { chatId });
            } catch (error) {
                socket.emit("error", { message: "Cannot join room" });
            }
        });

        socket.on("leaveRoom", (chatId: string) => {
            socket.leave(chatId);
            socket.emit("roomLeft", { chatId });
        });

        socket.on("chatMessage", async (payload: { chatId: string; text: string }) => {
            try {
                if (!payload?.chatId || !payload?.text) {
                    socket.emit("error", { message: "chatId and text are required" });
                    return;
                }

                if (!userId) {
                    socket.emit("error", { message: "Authentication required" });
                    return;
                }

                const message = await ChatService.sendMessage(payload.chatId, userId, payload.text);
                socket.to(payload.chatId).emit("message", message);
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
