"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRepository = void 0;
const Post_1 = require("../models/Post");
class PostRepository {
    static async create(postData) {
        const post = new Post_1.Post(postData);
        return await post.save();
    }
    static async findAll() {
        return await Post_1.Post.find().sort({ createdAt: -1 });
    }
    static async findById(id) {
        return await Post_1.Post.findById(id);
    }
    static async findByUserId(userId) {
        return await Post_1.Post.find({ userId }).sort({ createdAt: -1 });
    }
    static async updateById(id, updateData) {
        return await Post_1.Post.findByIdAndUpdate(id, updateData, { new: true });
    }
    static async deleteById(id) {
        const result = await Post_1.Post.findByIdAndDelete(id);
        return !!result;
    }
}
exports.PostRepository = PostRepository;
//# sourceMappingURL=PostRepository.js.map