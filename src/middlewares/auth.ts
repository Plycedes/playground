import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_CONFIG } from "../config/auth";
import { ERROR_MESSAGES } from "../constants/messages";
import { HTTP_STATUS } from "../constants/statusCodes";
import { ResponseUtil } from "../utils/response";

export class AuthMiddleware {
    static authenticate(req: Request, res: Response, next: NextFunction): void {
        try {
            const token = req.header("Authorization")?.replace("Bearer ", "");
            if (!token) {
                ResponseUtil.error(res, ERROR_MESSAGES.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED);
                return;
            }

            const decoded = jwt.verify(token, JWT_CONFIG.SECRET);
            (req as any).user = decoded;
            next();
        } catch (error) {
            ResponseUtil.error(res, ERROR_MESSAGES.INVALID_TOKEN, HTTP_STATUS.UNAUTHORIZED);
        }
    }
}
