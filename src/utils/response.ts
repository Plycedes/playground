import { Response } from "express";
import { HTTP_STATUS } from "../constants/statusCodes";

export class ResponseUtil {
    static success(
        res: Response,
        data: any,
        message: string = "Success",
        statusCode: number = HTTP_STATUS.OK,
    ): void {
        res.status(statusCode).json({
            success: true,
            message,
            data,
        });
    }

    static error(
        res: Response,
        message: string,
        statusCode: number = HTTP_STATUS.INTERNAL_SERVER_ERROR,
    ): void {
        res.status(statusCode).json({
            success: false,
            message,
        });
    }
}
