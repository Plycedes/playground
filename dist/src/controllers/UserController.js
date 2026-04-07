"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const UserService_1 = require("../services/UserService");
const response_1 = require("../utils/response");
const statusCodes_1 = require("../constants/statusCodes");
const messages_1 = require("../constants/messages");
class UserController {
    static async createUser(req, res, next) {
        const user = await UserService_1.UserService.createUser(req.body);
        response_1.ResponseUtil.success(res, user, messages_1.SUCCESS_MESSAGES.USER_CREATED, statusCodes_1.HTTP_STATUS.CREATED);
    }
    static async login(req, res, next) {
        const result = await UserService_1.UserService.authenticateUser(req.body.email, req.body.password);
        response_1.ResponseUtil.success(res, result, messages_1.SUCCESS_MESSAGES.LOGIN_SUCCESSFUL);
    }
    static async getProfile(req, res, next) {
        const userId = req.user.id;
        const user = await UserService_1.UserService.getUserById(userId);
        response_1.ResponseUtil.success(res, user);
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map