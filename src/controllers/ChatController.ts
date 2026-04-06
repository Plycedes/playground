import { Request, Response, NextFunction } from "express";
import { ChatService } from "../services/ChatService";
import { ResponseUtil } from "../utils/response";
import { HTTP_STATUS } from "../constants/statusCodes";

export class ChatController {
    static async sendMessage(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { roomId } = req.params;
            const { text } = req.body;
            const senderId = (req as any).user.id;

            const message = await ChatService.sendMessage(roomId, senderId, text);
            ResponseUtil.success(res, message, "Message sent successfully", HTTP_STATUS.CREATED);
        } catch (error) {
            next(error);
        }
    }

    static async readMessages(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { roomId } = req.params;
            const messages = await ChatService.readMessages(roomId);
            ResponseUtil.success(res, messages);
        } catch (error) {
            next(error);
        }
    }
}
