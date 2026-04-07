import { Response } from "express";
export declare class ResponseUtil {
    static success(res: Response, data: any, message?: string, statusCode?: number): void;
    static error(res: Response, message: string, statusCode?: number): void;
}
//# sourceMappingURL=response.d.ts.map