import { Request, Response, NextFunction } from "express";
import { ChatService } from "../services/ChatService";
import { ResponseUtil } from "../utils/response";
import { HTTP_STATUS } from "../constants/statusCodes";

export class ChatController {
    static async createChat(req: Request, res: Response, next: NextFunction): Promise<void> {
        const userId = (req as any).user.id;
        const { name } = req.body;
        const chat = await ChatService.createChat(userId, name);
        ResponseUtil.success(res, chat, "Chat created successfully", HTTP_STATUS.CREATED);
    }

    static async joinChat(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.params;
        const userId = (req as any).user.id;
        const chat = await ChatService.joinChat(id, userId);
        ResponseUtil.success(res, chat, "Joined chat successfully");
    }

    static async leaveChat(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.params;
        const userId = (req as any).user.id;
        const chat = await ChatService.leaveChat(id, userId);
        ResponseUtil.success(res, chat, "Left chat successfully");
    }

    static async getChats(req: Request, res: Response, next: NextFunction): Promise<void> {
        const userId = (req as any).user.id;
        const chats = await ChatService.getChats(userId);
        ResponseUtil.success(res, chats);
    }

    static async getChatById(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.params;
        const userId = (req as any).user.id;
        const chat = await ChatService.getChatById(id, userId);
        ResponseUtil.success(res, chat);
    }

    static async sendMessage(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { roomId } = req.params;
        const { text } = req.body;
        const senderId = (req as any).user.id;

        const message = await ChatService.sendMessage(roomId, senderId, text);
        ResponseUtil.success(res, message, "Message sent successfully", HTTP_STATUS.CREATED);
    }

    static async readMessages(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { roomId } = req.params;
        const userId = (req as any).user.id;
        const messages = await ChatService.readMessages(roomId, userId);
        ResponseUtil.success(res, messages);
    }
}
