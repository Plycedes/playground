import mongoose, { Document } from "mongoose";
export interface IChat extends Document {
    name: string;
    creatorId: string;
    members: string[];
    createdAt: Date;
    updatedAt: Date;
}
export declare const Chat: mongoose.Model<IChat, {}, {}, {}, mongoose.Document<unknown, {}, IChat> & IChat & {
    _id: mongoose.Types.ObjectId;
}, any>;
//# sourceMappingURL=Chat.d.ts.map