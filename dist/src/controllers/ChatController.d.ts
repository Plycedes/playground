import { Request, Response, NextFunction } from "express";
export declare class ChatController {
    static createChat(req: Request, res: Response, next: NextFunction): Promise<void>;
    static joinChat(req: Request, res: Response, next: NextFunction): Promise<void>;
    static leaveChat(req: Request, res: Response, next: NextFunction): Promise<void>;
    static getChats(req: Request, res: Response, next: NextFunction): Promise<void>;
    static getChatById(req: Request, res: Response, next: NextFunction): Promise<void>;
    static sendMessage(req: Request, res: Response, next: NextFunction): Promise<void>;
    static readMessages(req: Request, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=ChatController.d.ts.map