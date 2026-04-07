import mongoose, { Document } from "mongoose";
export interface IMessage extends Document {
    roomId: string;
    senderId: string;
    text: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Message: mongoose.Model<IMessage, {}, {}, {}, mongoose.Document<unknown, {}, IMessage> & IMessage & {
    _id: mongoose.Types.ObjectId;
}, any>;
//# sourceMappingURL=Message.d.ts.map