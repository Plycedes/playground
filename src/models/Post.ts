import mongoose, { Document, Schema } from "mongoose";

export interface IPost extends Document {
    userId: string;
    text: string;
    createdAt: Date;
    updatedAt: Date;
}

const postSchema = new Schema<IPost>(
    {
        userId: { type: String, required: true },
        text: { type: String, required: true },
    },
    {
        timestamps: true,
    },
);

export const Post = mongoose.model<IPost>("Post", postSchema);
