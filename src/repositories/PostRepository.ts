import { Post, IPost } from "../models/Post";

export class PostRepository {
    static async create(postData: Partial<IPost>): Promise<IPost> {
        const post = new Post(postData);
        return await post.save();
    }

    static async findAll(): Promise<IPost[]> {
        return await Post.find().sort({ createdAt: -1 });
    }

    static async findById(id: string): Promise<IPost | null> {
        return await Post.findById(id);
    }

    static async findByUserId(userId: string): Promise<IPost[]> {
        return await Post.find({ userId }).sort({ createdAt: -1 });
    }

    static async updateById(id: string, updateData: Partial<IPost>): Promise<IPost | null> {
        return await Post.findByIdAndUpdate(id, updateData, { new: true });
    }

    static async deleteById(id: string): Promise<boolean> {
        const result = await Post.findByIdAndDelete(id);
        return !!result;
    }
}
