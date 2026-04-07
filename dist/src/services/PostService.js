"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const PostRepository_1 = require("../repositories/PostRepository");
const messages_1 = require("../constants/messages");
class PostService {
    static async createPost(userId, text) {
        const post = await PostRepository_1.PostRepository.create({ userId, text });
        return {
            id: post._id,
            userId: post.userId,
            text: post.text,
            createdAt: post.createdAt,
        };
    }
    static async getPosts(userId) {
        const posts = userId
            ? await PostRepository_1.PostRepository.findByUserId(userId)
            : await PostRepository_1.PostRepository.findAll();
        return posts.map((post) => ({
            id: post._id,
            userId: post.userId,
            text: post.text,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
        }));
    }
    static async getPostById(id, userId) {
        const post = await PostRepository_1.PostRepository.findById(id);
        if (!post) {
            throw new Error(messages_1.ERROR_MESSAGES.POST_NOT_FOUND);
        }
        if (post.userId !== userId) {
            throw new Error(messages_1.ERROR_MESSAGES.UNAUTHORIZED);
        }
        return {
            id: post._id,
            userId: post.userId,
            text: post.text,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
        };
    }
    static async updatePost(id, userId, text) {
        const post = await PostRepository_1.PostRepository.findById(id);
        if (!post) {
            throw new Error(messages_1.ERROR_MESSAGES.POST_NOT_FOUND);
        }
        if (post.userId !== userId) {
            throw new Error(messages_1.ERROR_MESSAGES.UNAUTHORIZED);
        }
        const updatedPost = await PostRepository_1.PostRepository.updateById(id, { text });
        if (!updatedPost) {
            throw new Error(messages_1.ERROR_MESSAGES.POST_NOT_FOUND);
        }
        return {
            id: updatedPost._id,
            userId: updatedPost.userId,
            text: updatedPost.text,
            createdAt: updatedPost.createdAt,
            updatedAt: updatedPost.updatedAt,
        };
    }
    static async deletePost(id, userId) {
        const post = await PostRepository_1.PostRepository.findById(id);
        if (!post) {
            throw new Error(messages_1.ERROR_MESSAGES.POST_NOT_FOUND);
        }
        if (post.userId !== userId) {
            throw new Error(messages_1.ERROR_MESSAGES.UNAUTHORIZED);
        }
        const deleted = await PostRepository_1.PostRepository.deleteById(id);
        if (!deleted) {
            throw new Error(messages_1.ERROR_MESSAGES.POST_NOT_FOUND);
        }
    }
}
exports.PostService = PostService;
//# sourceMappingURL=PostService.js.map