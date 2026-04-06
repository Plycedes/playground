import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/UserService";
import { ResponseUtil } from "../utils/response";

import { HTTP_STATUS } from "../constants/statusCodes";
import { SUCCESS_MESSAGES } from "../constants/messages";

export class UserController {
    static async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        const user = await UserService.createUser(req.body);
        ResponseUtil.success(res, user, SUCCESS_MESSAGES.USER_CREATED, HTTP_STATUS.CREATED);
    }

    static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        const result = await UserService.authenticateUser(req.body.email, req.body.password);
        ResponseUtil.success(res, result, SUCCESS_MESSAGES.LOGIN_SUCCESSFUL);
    }

    static async getProfile(req: Request, res: Response, next: NextFunction): Promise<void> {
        const userId = (req as any).user.id;
        const user = await UserService.getUserById(userId);
        ResponseUtil.success(res, user);
    }
}
