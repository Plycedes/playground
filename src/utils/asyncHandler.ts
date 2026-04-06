import { Request, Response, NextFunction, RequestHandler } from "express";

export const asyncHandler = <T extends RequestHandler>(fn: T): T => {
    return ((req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    }) as T;
};
