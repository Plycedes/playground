export declare class ChatService {
    static createChat(creatorId: string, name: string): Promise<any>;
    static joinChat(chatId: string, userId: string): Promise<any>;
    static leaveChat(chatId: string, userId: string): Promise<any>;
    static getChats(userId: string): Promise<any[]>;
    static getChatById(chatId: string, userId: string): Promise<any>;
    static sendMessage(chatId: string, senderId: string, text: string): Promise<any>;
    static readMessages(chatId: string, userId: string): Promise<any[]>;
}
//# sourceMappingURL=ChatService.d.ts.map