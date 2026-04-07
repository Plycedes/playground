export declare class PostService {
    static createPost(userId: string, text: string): Promise<any>;
    static getPosts(userId?: string): Promise<any[]>;
    static getPostById(id: string, userId: string): Promise<any>;
    static updatePost(id: string, userId: string, text: string): Promise<any>;
    static deletePost(id: string, userId: string): Promise<void>;
}
//# sourceMappingURL=PostService.d.ts.map