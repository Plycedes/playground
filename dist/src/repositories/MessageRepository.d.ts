import { IMessage } from "../models/Message";
export declare class MessageRepository {
    static create(messageData: Partial<IMessage>): Promise<IMessage>;
    static findByRoomId(roomId: string): Promise<IMessage[]>;
    static findById(id: string): Promise<IMessage | null>;
}
//# sourceMappingURL=MessageRepository.d.ts.map