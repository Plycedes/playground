import { IPost } from "../models/Post";
export declare class PostRepository {
    static create(postData: Partial<IPost>): Promise<IPost>;
    static findAll(): Promise<IPost[]>;
    static findById(id: string): Promise<IPost | null>;
    static findByUserId(userId: string): Promise<IPost[]>;
    static updateById(id: string, updateData: Partial<IPost>): Promise<IPost | null>;
    static deleteById(id: string): Promise<boolean>;
}
//# sourceMappingURL=PostRepository.d.ts.map