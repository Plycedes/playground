import { IChat } from "../models/Chat";
export declare class ChatRepository {
    static create(chatData: Partial<IChat>): Promise<IChat>;
    static findAll(): Promise<IChat[]>;
    static findById(id: string): Promise<IChat | null>;
    static findByMember(userId: string): Promise<IChat[]>;
    static addMember(id: string, userId: string): Promise<IChat | null>;
    static removeMember(id: string, userId: string): Promise<IChat | null>;
    static deleteById(id: string): Promise<boolean>;
}
//# sourceMappingURL=ChatRepository.d.ts.map