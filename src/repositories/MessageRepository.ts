import { Message, IMessage } from "../models/Message";

export class MessageRepository {
    static async create(messageData: Partial<IMessage>): Promise<IMessage> {
        const message = new Message(messageData);
        return await message.save();
    }

    static async findByRoomId(roomId: string): Promise<IMessage[]> {
        return await Message.find({ roomId }).sort({ createdAt: 1 });
    }

    static async findById(id: string): Promise<IMessage | null> {
        return await Message.findById(id);
    }
}
