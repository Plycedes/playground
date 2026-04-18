import type { Server } from "socket.io";

let ioInstance: Server | null = null;

export function setSocketIo(server: Server): void {
    ioInstance = server;
}

export function getSocketIo(): Server | null {
    return ioInstance;
}

export async function closeSocketIo(): Promise<void> {
    if (!ioInstance) {
        return;
    }
    const io = ioInstance;
    ioInstance = null;
    await new Promise<void>((resolve, reject) => {
        io.close((err) => {
            if (err) reject(err);
            else resolve();
        });
    });
}

/** Broadcast to every socket in a chat room across all nodes (requires Redis adapter). */
export function emitToChatRoom(chatId: string, event: string, payload: unknown): void {
    if (!ioInstance) {
        return;
    }
    ioInstance.to(chatId).emit(event, payload);
}
