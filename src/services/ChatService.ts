import { ChatRepository } from "../repositories/ChatRepository";
import { MessageRepository } from "../repositories/MessageRepository";
import { ERROR_MESSAGES } from "../constants/messages";

export class ChatService {
    static async createChat(creatorId: string, name: string): Promise<any> {
        const chat = await ChatRepository.create({ name, creatorId, members: [creatorId] });
        return {
            _id: chat._id,
            name: chat.name,
            creatorId: chat.creatorId,
            members: chat.members,
            createdAt: chat.createdAt,
        };
    }

    static async joinChat(chatId: string, userId: string): Promise<any> {
        const chat = await ChatRepository.findById(chatId);
        if (!chat) {
            throw new Error("Chat not found");
        }
        if (chat.members.includes(userId)) {
            throw new Error("Already a member");
        }
        const updatedChat = await ChatRepository.addMember(chatId, userId);
        if (!updatedChat) {
            throw new Error("Chat not found");
        }
        return {
            _id: updatedChat._id,
            name: updatedChat.name,
            creatorId: updatedChat.creatorId,
            members: updatedChat.members,
            createdAt: updatedChat.createdAt,
        };
    }

    static async leaveChat(chatId: string, userId: string): Promise<any> {
        const chat = await ChatRepository.findById(chatId);
        if (!chat) {
            throw new Error("Chat not found");
        }
        if (!chat.members.includes(userId)) {
            throw new Error("Not a member");
        }
        const updatedChat = await ChatRepository.removeMember(chatId, userId);
        if (!updatedChat) {
            throw new Error("Chat not found");
        }
        return {
            _id: updatedChat._id,
            name: updatedChat.name,
            creatorId: updatedChat.creatorId,
            members: updatedChat.members,
            createdAt: updatedChat.createdAt,
        };
    }

    static async getChats(userId: string): Promise<any[]> {
        const chats = await ChatRepository.findByMember(userId);
        return chats.map((chat) => ({
            _id: chat._id,
            name: chat.name,
            creatorId: chat.creatorId,
            members: chat.members,
            createdAt: chat.createdAt,
            updatedAt: chat.updatedAt,
        }));
    }

    static async getChatById(chatId: string, userId: string): Promise<any> {
        const chat = await ChatRepository.findById(chatId);
        if (!chat) {
            throw new Error("Chat not found");
        }
        if (!chat.members.includes(userId)) {
            throw new Error("Not a member");
        }
        return {
            _id: chat._id,
            name: chat.name,
            creatorId: chat.creatorId,
            members: chat.members,
            createdAt: chat.createdAt,
            updatedAt: chat.updatedAt,
        };
    }

    static async sendMessage(chatId: string, senderId: string, text: string): Promise<any> {
        const chat = await ChatRepository.findById(chatId);
        if (!chat) {
            throw new Error("Chat not found");
        }
        if (!chat.members.includes(senderId)) {
            throw new Error("Not a member");
        }
        const message = await MessageRepository.create({ roomId: chatId, senderId, text });
        return {
            _id: message._id,
            chatId: message.roomId,
            senderId: message.senderId,
            text: message.text,
            createdAt: message.createdAt,
            updatedAt: message.updatedAt,
        };
    }

    static async readMessages(chatId: string, userId: string): Promise<any[]> {
        const chat = await ChatRepository.findById(chatId);
        if (!chat) {
            throw new Error("Chat not found");
        }
        if (!chat.members.includes(userId)) {
            throw new Error("Not a member");
        }
        const messages = await MessageRepository.findByRoomId(chatId);
        return messages.map((message) => ({
            _id: message._id,
            chatId: message.roomId,
            senderId: message.senderId,
            text: message.text,
            createdAt: message.createdAt,
            updatedAt: message.updatedAt,
        }));
    }
}
