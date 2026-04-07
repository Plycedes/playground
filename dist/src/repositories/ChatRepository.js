"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRepository = void 0;
const Chat_1 = require("../models/Chat");
class ChatRepository {
    static async create(chatData) {
        const chat = new Chat_1.Chat(chatData);
        return await chat.save();
    }
    static async findAll() {
        return await Chat_1.Chat.find().sort({ createdAt: -1 });
    }
    static async findById(id) {
        return await Chat_1.Chat.findById(id);
    }
    static async findByMember(userId) {
        return await Chat_1.Chat.find({ members: userId }).sort({ createdAt: -1 });
    }
    static async addMember(id, userId) {
        return await Chat_1.Chat.findByIdAndUpdate(id, { $addToSet: { members: userId } }, { new: true });
    }
    static async removeMember(id, userId) {
        return await Chat_1.Chat.findByIdAndUpdate(id, { $pull: { members: userId } }, { new: true });
    }
    static async deleteById(id) {
        const result = await Chat_1.Chat.findByIdAndDelete(id);
        return !!result;
    }
}
exports.ChatRepository = ChatRepository;
//# sourceMappingURL=ChatRepository.js.map