import mongoose, { Document } from "mongoose";
export interface IPost extends Document {
    userId: string;
    text: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Post: mongoose.Model<IPost, {}, {}, {}, mongoose.Document<unknown, {}, IPost> & IPost & {
    _id: mongoose.Types.ObjectId;
}, any>;
//# sourceMappingURL=Post.d.ts.map