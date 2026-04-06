import { Request, Response, NextFunction } from "express";
import { PostService } from "../services/PostService";
import { ResponseUtil } from "../utils/response";
import { HTTP_STATUS } from "../constants/statusCodes";
import { SUCCESS_MESSAGES } from "../constants/messages";

export class PostController {
    static async createPost(req: Request, res: Response, next: NextFunction): Promise<void> {
        const userId = (req as any).user.id;
        const { text } = req.body;
        const post = await PostService.createPost(userId, text);
        ResponseUtil.success(res, post, SUCCESS_MESSAGES.POST_CREATED, HTTP_STATUS.CREATED);
    }

    static async getPosts(req: Request, res: Response, next: NextFunction): Promise<void> {
        const userId = (req as any).user?.id;
        const posts = await PostService.getPosts(userId);
        ResponseUtil.success(res, posts);
    }

    static async getPostById(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.params;
        const userId = (req as any).user.id;
        const post = await PostService.getPostById(id, userId);
        ResponseUtil.success(res, post);
    }

    static async updatePost(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.params;
        const userId = (req as any).user.id;
        const { text } = req.body;
        const post = await PostService.updatePost(id, userId, text);
        ResponseUtil.success(res, post, SUCCESS_MESSAGES.POST_UPDATED);
    }

    static async deletePost(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.params;
        const userId = (req as any).user.id;
        await PostService.deletePost(id, userId);
        ResponseUtil.success(res, null, SUCCESS_MESSAGES.POST_DELETED);
    }
}
