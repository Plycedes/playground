import { PostRepository } from "../repositories/PostRepository";
import { ERROR_MESSAGES } from "../constants/messages";

export class PostService {
    static async createPost(userId: string, text: string): Promise<any> {
        const post = await PostRepository.create({ userId, text });
        return {
            id: post._id,
            userId: post.userId,
            text: post.text,
            createdAt: post.createdAt,
        };
    }

    static async getPosts(userId?: string): Promise<any[]> {
        const posts = userId
            ? await PostRepository.findByUserId(userId)
            : await PostRepository.findAll();
        return posts.map((post) => ({
            id: post._id,
            userId: post.userId,
            text: post.text,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
        }));
    }

    static async getPostById(id: string, userId: string): Promise<any> {
        const post = await PostRepository.findById(id);
        if (!post) {
            throw new Error(ERROR_MESSAGES.POST_NOT_FOUND);
        }
        if (post.userId !== userId) {
            throw new Error(ERROR_MESSAGES.UNAUTHORIZED);
        }
        return {
            id: post._id,
            userId: post.userId,
            text: post.text,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
        };
    }

    static async updatePost(id: string, userId: string, text: string): Promise<any> {
        const post = await PostRepository.findById(id);
        if (!post) {
            throw new Error(ERROR_MESSAGES.POST_NOT_FOUND);
        }
        if (post.userId !== userId) {
            throw new Error(ERROR_MESSAGES.UNAUTHORIZED);
        }
        const updatedPost = await PostRepository.updateById(id, { text });
        if (!updatedPost) {
            throw new Error(ERROR_MESSAGES.POST_NOT_FOUND);
        }
        return {
            id: updatedPost._id,
            userId: updatedPost.userId,
            text: updatedPost.text,
            createdAt: updatedPost.createdAt,
            updatedAt: updatedPost.updatedAt,
        };
    }

    static async deletePost(id: string, userId: string): Promise<void> {
        const post = await PostRepository.findById(id);
        if (!post) {
            throw new Error(ERROR_MESSAGES.POST_NOT_FOUND);
        }
        if (post.userId !== userId) {
            throw new Error(ERROR_MESSAGES.UNAUTHORIZED);
        }
        const deleted = await PostRepository.deleteById(id);
        if (!deleted) {
            throw new Error(ERROR_MESSAGES.POST_NOT_FOUND);
        }
    }
}
