"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const PostService_1 = require("../services/PostService");
const response_1 = require("../utils/response");
const statusCodes_1 = require("../constants/statusCodes");
const messages_1 = require("../constants/messages");
class PostController {
    static async createPost(req, res, next) {
        const userId = req.user.id;
        const { text } = req.body;
        const post = await PostService_1.PostService.createPost(userId, text);
        response_1.ResponseUtil.success(res, post, messages_1.SUCCESS_MESSAGES.POST_CREATED, statusCodes_1.HTTP_STATUS.CREATED);
    }
    static async getPosts(req, res, next) {
        const userId = req.user?.id;
        const posts = await PostService_1.PostService.getPosts(userId);
        response_1.ResponseUtil.success(res, posts);
    }
    static async getPostById(req, res, next) {
        const { id } = req.params;
        const userId = req.user.id;
        const post = await PostService_1.PostService.getPostById(id, userId);
        response_1.ResponseUtil.success(res, post);
    }
    static async updatePost(req, res, next) {
        const { id } = req.params;
        const userId = req.user.id;
        const { text } = req.body;
        const post = await PostService_1.PostService.updatePost(id, userId, text);
        response_1.ResponseUtil.success(res, post, messages_1.SUCCESS_MESSAGES.POST_UPDATED);
    }
    static async deletePost(req, res, next) {
        const { id } = req.params;
        const userId = req.user.id;
        await PostService_1.PostService.deletePost(id, userId);
        response_1.ResponseUtil.success(res, null, messages_1.SUCCESS_MESSAGES.POST_DELETED);
    }
}
exports.PostController = PostController;
//# sourceMappingURL=PostController.js.map