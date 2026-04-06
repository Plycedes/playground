import mongoose, { Document, Schema } from "mongoose";

export interface IMessage extends Document {
    roomId: string;
    senderId: string;
    text: string;
    createdAt: Date;
    updatedAt: Date;
}

const messageSchema = new Schema<IMessage>(
    {
        roomId: { type: String, required: true, index: true },
        senderId: { type: String, required: true, index: true },
        text: { type: String, required: true },
    },
    {
        timestamps: true,
    },
);

export const Message = mongoose.model<IMessage>("Message", messageSchema);
