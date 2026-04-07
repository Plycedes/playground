"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageRepository = void 0;
const Message_1 = require("../models/Message");
class MessageRepository {
    static async create(messageData) {
        const message = new Message_1.Message(messageData);
        return await message.save();
    }
    static async findByRoomId(roomId) {
        return await Message_1.Message.find({ roomId }).sort({ createdAt: 1 });
    }
    static async findById(id) {
        return await Message_1.Message.findById(id);
    }
}
exports.MessageRepository = MessageRepository;
//# sourceMappingURL=MessageRepository.js.map