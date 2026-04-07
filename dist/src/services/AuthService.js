"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("../config/auth");
const messages_1 = require("../constants/messages");
class AuthService {
    static async hashPassword(password) {
        return await bcryptjs_1.default.hash(password, auth_1.BCRYPT_CONFIG.ROUNDS);
    }
    static async comparePassword(password, hashedPassword) {
        return await bcryptjs_1.default.compare(password, hashedPassword);
    }
    static generateToken(payload) {
        return jsonwebtoken_1.default.sign(payload, auth_1.JWT_CONFIG.SECRET, { expiresIn: auth_1.JWT_CONFIG.EXPIRES_IN });
    }
    static verifyToken(token) {
        try {
            return jsonwebtoken_1.default.verify(token, auth_1.JWT_CONFIG.SECRET);
        }
        catch (error) {
            throw new Error(messages_1.ERROR_MESSAGES.INVALID_TOKEN);
        }
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=AuthService.js.map