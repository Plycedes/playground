import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/UserRepository";
import { BCRYPT_CONFIG, JWT_CONFIG } from "../config/auth";
import { ERROR_MESSAGES } from "../constants/messages";

export class AuthService {
    static async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, BCRYPT_CONFIG.ROUNDS);
    }

    static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, hashedPassword);
    }

    static generateToken(payload: object): string {
        return (jwt.sign as any)(payload, JWT_CONFIG.SECRET, { expiresIn: JWT_CONFIG.EXPIRES_IN });
    }

    static verifyToken(token: string): any {
        try {
            return jwt.verify(token, JWT_CONFIG.SECRET);
        } catch (error) {
            throw new Error(ERROR_MESSAGES.INVALID_TOKEN);
        }
    }
}
