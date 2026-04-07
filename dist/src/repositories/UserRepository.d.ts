import { IUser } from "../models/User";
export declare class UserRepository {
    static create(userData: Partial<IUser>): Promise<IUser>;
    static findByEmail(email: string): Promise<IUser | null>;
    static findById(id: string): Promise<IUser | null>;
    static updateById(id: string, updateData: Partial<IUser>): Promise<IUser | null>;
    static deleteById(id: string): Promise<boolean>;
}
//# sourceMappingURL=UserRepository.d.ts.map