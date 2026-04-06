import { MessageRepository } from "../repositories/MessageRepository";
import { ERROR_MESSAGES } from "../constants/messages";

export class ChatService {
    static async sendMessage(roomId: string, senderId: string, text: string): Promise<any> {
        const message = await MessageRepository.create({ roomId, senderId, text });
        return {
            id: message._id,
            roomId: message.roomId,
            senderId: message.senderId,
            text: message.text,
            createdAt: message.createdAt,
            updatedAt: message.updatedAt,
        };
    }

    static async readMessages(roomId: string): Promise<any[]> {
        const messages = await MessageRepository.findByRoomId(roomId);
        if (!messages.length) {
            return [];
        }

        return messages.map((message) => ({
            id: message._id,
            roomId: message.roomId,
            senderId: message.senderId,
            text: message.text,
            createdAt: message.createdAt,
            updatedAt: message.updatedAt,
        }));
    }
}
