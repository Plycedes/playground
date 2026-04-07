"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const ChatRepository_1 = require("../repositories/ChatRepository");
const MessageRepository_1 = require("../repositories/MessageRepository");
class ChatService {
    static async createChat(creatorId, name) {
        const chat = await ChatRepository_1.ChatRepository.create({ name, creatorId, members: [creatorId] });
        return {
            _id: chat._id,
            name: chat.name,
            creatorId: chat.creatorId,
            members: chat.members,
            createdAt: chat.createdAt,
        };
    }
    static async joinChat(chatId, userId) {
        const chat = await ChatRepository_1.ChatRepository.findById(chatId);
        if (!chat) {
            throw new Error("Chat not found");
        }
        if (chat.members.includes(userId)) {
            throw new Error("Already a member");
        }
        const updatedChat = await ChatRepository_1.ChatRepository.addMember(chatId, userId);
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
    static async leaveChat(chatId, userId) {
        const chat = await ChatRepository_1.ChatRepository.findById(chatId);
        if (!chat) {
            throw new Error("Chat not found");
        }
        if (!chat.members.includes(userId)) {
            throw new Error("Not a member");
        }
        const updatedChat = await ChatRepository_1.ChatRepository.removeMember(chatId, userId);
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
    static async getChats(userId) {
        const chats = await ChatRepository_1.ChatRepository.findByMember(userId);
        return chats.map((chat) => ({
            _id: chat._id,
            name: chat.name,
            creatorId: chat.creatorId,
            members: chat.members,
            createdAt: chat.createdAt,
            updatedAt: chat.updatedAt,
        }));
    }
    static async getChatById(chatId, userId) {
        const chat = await ChatRepository_1.ChatRepository.findById(chatId);
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
    static async sendMessage(chatId, senderId, text) {
        const chat = await ChatRepository_1.ChatRepository.findById(chatId);
        if (!chat) {
            throw new Error("Chat not found");
        }
        if (!chat.members.includes(senderId)) {
            throw new Error("Not a member");
        }
        const message = await MessageRepository_1.MessageRepository.create({ roomId: chatId, senderId, text });
        return {
            _id: message._id,
            chatId: message.roomId,
            senderId: message.senderId,
            text: message.text,
            createdAt: message.createdAt,
            updatedAt: message.updatedAt,
        };
    }
    static async readMessages(chatId, userId) {
        const chat = await ChatRepository_1.ChatRepository.findById(chatId);
        if (!chat) {
            throw new Error("Chat not found");
        }
        if (!chat.members.includes(userId)) {
            throw new Error("Not a member");
        }
        const messages = await MessageRepository_1.MessageRepository.findByRoomId(chatId);
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
exports.ChatService = ChatService;
//# sourceMappingURL=ChatService.js.map