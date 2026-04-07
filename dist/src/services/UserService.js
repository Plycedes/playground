"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const UserRepository_1 = require("../repositories/UserRepository");
const AuthService_1 = require("./AuthService");
const messages_1 = require("../constants/messages");
class UserService {
    static async createUser(userData) {
        const existingUser = await UserRepository_1.UserRepository.findByEmail(userData.email);
        if (existingUser) {
            throw new Error(messages_1.ERROR_MESSAGES.USER_ALREADY_EXISTS);
        }
        const hashedPassword = await AuthService_1.AuthService.hashPassword(userData.password);
        const user = await UserRepository_1.UserRepository.create({
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
    static async authenticateUser(email, password) {
        const user = await UserRepository_1.UserRepository.findByEmail(email);
        if (!user) {
            throw new Error(messages_1.ERROR_MESSAGES.INVALID_CREDENTIALS);
        }
        const isPasswordValid = await AuthService_1.AuthService.comparePassword(password, user.password);
        if (!isPasswordValid) {
            throw new Error(messages_1.ERROR_MESSAGES.INVALID_CREDENTIALS);
        }
        const token = AuthService_1.AuthService.generateToken({ id: user._id, email: user.email });
        return {
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
            },
            token,
        };
    }
    static async getUserById(id) {
        const user = await UserRepository_1.UserRepository.findById(id);
        if (!user) {
            throw new Error(messages_1.ERROR_MESSAGES.USER_NOT_FOUND);
        }
        return {
            id: user._id,
            email: user.email,
            name: user.name,
            createdAt: user.createdAt,
        };
    }
}
exports.UserService = UserService;
//# sourceMappingURL=UserService.js.map