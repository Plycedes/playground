import { UserRepository } from "../repositories/UserRepository";
import { AuthService } from "./AuthService";
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../constants/messages";

export class UserService {
    static async createUser(userData: {
        email: string;
        password: string;
        name: string;
    }): Promise<any> {
        const existingUser = await UserRepository.findByEmail(userData.email);
        if (existingUser) {
            throw new Error(ERROR_MESSAGES.USER_ALREADY_EXISTS);
        }

        const hashedPassword = await AuthService.hashPassword(userData.password);
        const user = await UserRepository.create({
            ...userData,
            password: hashedPassword,
        });

        return {
            id: user._id,
            email: user.email,
            name: user.name,
            createdAt: user.createdAt,
        };
    }

    static async authenticateUser(email: string, password: string): Promise<any> {
        const user = await UserRepository.findByEmail(email);
        if (!user) {
            throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
        }

        const isPasswordValid = await AuthService.comparePassword(password, user.password);
        if (!isPasswordValid) {
            throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
        }

        const token = AuthService.generateToken({ id: user._id, email: user.email });
        return {
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
            },
            token,
        };
    }

    static async getUserById(id: string): Promise<any> {
        const user = await UserRepository.findById(id);
        if (!user) {
            throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
        }

        return {
            id: user._id,
            email: user.email,
            name: user.name,
            createdAt: user.createdAt,
        };
    }
}
