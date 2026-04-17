import type { Server } from "socket.io";

let ioInstance: Server | null = null;

export function setSocketIo(server: Server): void {
    ioInstance = server;
}

/** Broadcast to every socket in a chat room across all nodes (requires Redis adapter). */
export function emitToChatRoom(chatId: string, event: string, payload: unknown): void {
    if (!ioInstance) {
        return;
    }
    ioInstance.to(chatId).emit(event, payload);
}
