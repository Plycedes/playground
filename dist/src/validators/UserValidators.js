"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.UserSchema = {
    register: {
        body: joi_1.default.object().keys({
            email: joi_1.default.string().email().required(),
            password: joi_1.default.string().min(6).required(),
            name: joi_1.default.string().min(2).required(),
        }),
    },
    login: {
        body: joi_1.default.object().keys({
            email: joi_1.default.string().email().required(),
            password: joi_1.default.string().required(),
        }),
    },
};
//# sourceMappingURL=UserValidators.js.map