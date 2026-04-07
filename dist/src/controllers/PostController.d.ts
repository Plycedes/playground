import { Request, Response, NextFunction } from "express";
export declare class PostController {
    static createPost(req: Request, res: Response, next: NextFunction): Promise<void>;
    static getPosts(req: Request, res: Response, next: NextFunction): Promise<void>;
    static getPostById(req: Request, res: Response, next: NextFunction): Promise<void>;
    static updatePost(req: Request, res: Response, next: NextFunction): Promise<void>;
    static deletePost(req: Request, res: Response, next: NextFunction): Promise<void>;
}
//# sourceMappingURL=PostController.d.ts.map