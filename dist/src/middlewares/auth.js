"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("../config/auth");
const messages_1 = require("../constants/messages");
const statusCodes_1 = require("../constants/statusCodes");
const response_1 = require("../utils/response");
class AuthMiddleware {
    static authenticate(req, res, next) {
        try {
            const token = req.header("Authorization")?.replace("Bearer ", "");
            if (!token) {
                response_1.ResponseUtil.error(res, messages_1.ERROR_MESSAGES.UNAUTHORIZED, statusCodes_1.HTTP_STATUS.UNAUTHORIZED);
                return;
            }
            const decoded = jsonwebtoken_1.default.verify(token, auth_1.JWT_CONFIG.SECRET);
            req.user = decoded;
            next();
        }
        catch (error) {
            response_1.ResponseUtil.error(res, messages_1.ERROR_MESSAGES.INVALID_TOKEN, statusCodes_1.HTTP_STATUS.UNAUTHORIZED);
        }
    }
}
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=auth.js.map