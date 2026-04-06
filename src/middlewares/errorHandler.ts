import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";
import { ResponseUtil } from "../utils/response";
import { HTTP_STATUS } from "../constants/statusCodes";

export class ErrorHandlerMiddleware {
    static handle(error: any, req: Request, res: Response, next: NextFunction): void {
        logger.error("Error occurred:", error);

        if (error.message.includes("Validation")) {
            ResponseUtil.error(res, error.message, HTTP_STATUS.BAD_REQUEST);
            return;
        }

        if (error.message === "User already exists" || error.message === "Invalid credentials") {
            ResponseUtil.error(res, error.message, HTTP_STATUS.BAD_REQUEST);
            return;
        }

        ResponseUtil.error(res, "Internal server error", HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
}
