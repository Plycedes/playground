import { Chat, IChat } from "../models/Chat";

export class ChatRepository {
    static async create(chatData: Partial<IChat>): Promise<IChat> {
        const chat = new Chat(chatData);
        return await chat.save();
    }

    static async findAll(): Promise<IChat[]> {
        return await Chat.find().sort({ createdAt: -1 });
    }

    static async findById(id: string): Promise<IChat | null> {
        return await Chat.findById(id);
    }

    static async findByMember(userId: string): Promise<IChat[]> {
        return await Chat.find({ members: userId }).sort({ createdAt: -1 });
    }

    static async addMember(id: string, userId: string): Promise<IChat | null> {
        return await Chat.findByIdAndUpdate(id, { $addToSet: { members: userId } }, { new: true });
    }

    static async removeMember(id: string, userId: string): Promise<IChat | null> {
        return await Chat.findByIdAndUpdate(id, { $pull: { members: userId } }, { new: true });
    }

    static async deleteById(id: string): Promise<boolean> {
        const result = await Chat.findByIdAndDelete(id);
        return !!result;
    }
}
