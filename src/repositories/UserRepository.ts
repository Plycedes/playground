import { User, IUser } from "../models/User";

export class UserRepository {
    static async create(userData: Partial<IUser>): Promise<IUser> {
        const user = new User(userData);
        return await user.save();
    }

    static async findByEmail(email: string): Promise<IUser | null> {
        return await User.findOne({ email });
    }

    static async findById(id: string): Promise<IUser | null> {
        return await User.findById(id);
    }

    static async updateById(id: string, updateData: Partial<IUser>): Promise<IUser | null> {
        return await User.findByIdAndUpdate(id, updateData, { new: true });
    }

    static async deleteById(id: string): Promise<boolean> {
        const result = await User.findByIdAndDelete(id);
        return !!result;
    }
}
