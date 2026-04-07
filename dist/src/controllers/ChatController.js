"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatController = void 0;
const ChatService_1 = require("../services/ChatService");
const response_1 = require("../utils/response");
const statusCodes_1 = require("../constants/statusCodes");
class ChatController {
    static async createChat(req, res, next) {
        const userId = req.user.id;
        const { name } = req.body;
        const chat = await ChatService_1.ChatService.createChat(userId, name);
        response_1.ResponseUtil.success(res, chat, "Chat created successfully", statusCodes_1.HTTP_STATUS.CREATED);
    }
    static async joinChat(req, res, next) {
        const { id } = req.params;
        const userId = req.user.id;
        const chat = await ChatService_1.ChatService.joinChat(id, userId);
        response_1.ResponseUtil.success(res, chat, "Joined chat successfully");
    }
    static async leaveChat(req, res, next) {
        const { id } = req.params;
        const userId = req.user.id;
        const chat = await ChatService_1.ChatService.leaveChat(id, userId);
        response_1.ResponseUtil.success(res, chat, "Left chat successfully");
    }
    static async getChats(req, res, next) {
        const userId = req.user.id;
        const chats = await ChatService_1.ChatService.getChats(userId);
        response_1.ResponseUtil.success(res, chats);
    }
    static async getChatById(req, res, next) {
        const { id } = req.params;
        const userId = req.user.id;
        const chat = await ChatService_1.ChatService.getChatById(id, userId);
        response_1.ResponseUtil.success(res, chat);
    }
    static async sendMessage(req, res, next) {
        const { roomId } = req.params;
        const { text } = req.body;
        const senderId = req.user.id;
        const message = await ChatService_1.ChatService.sendMessage(roomId, senderId, text);
        response_1.ResponseUtil.success(res, message, "Message sent successfully", statusCodes_1.HTTP_STATUS.CREATED);
    }
    static async readMessages(req, res, next) {
        const { roomId } = req.params;
        const userId = req.user.id;
        const messages = await ChatService_1.ChatService.readMessages(roomId, userId);
        response_1.ResponseUtil.success(res, messages);
    }
}
exports.ChatController = ChatController;
//# sourceMappingURL=ChatController.js.map