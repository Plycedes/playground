import { Request, Response, NextFunction } from "express";
export declare class UserController {
    static createUser(req: Request, res: Response, next: NextFunction): Promise<void>;
    static login(req: Request, res: Response, next: NextFunction): Promise<void>;
    static getProfile(req: Request, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=UserController.d.ts.map