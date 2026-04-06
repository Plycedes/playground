import mongoose, { Document, Schema } from "mongoose";

export interface IChat extends Document {
    name: string;
    creatorId: string;
    members: string[];
    createdAt: Date;
    updatedAt: Date;
}

const chatSchema = new Schema<IChat>(
    {
        name: { type: String, required: true },
        creatorId: { type: String, required: true },
        members: [{ type: String, required: true }],
    },
    {
        timestamps: true,
    },
);

export const Chat = mongoose.model<IChat>("Chat", chatSchema);
