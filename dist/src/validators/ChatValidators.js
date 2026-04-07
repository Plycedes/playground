"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.ChatSchema = {
    create: {
        body: joi_1.default.object().keys({
            name: joi_1.default.string().min(1).max(100).required(),
        }),
    },
    join: {
        params: joi_1.default.object().keys({
            id: joi_1.default.string().length(24).hex().required(),
        }),
    },
    leave: {
        params: joi_1.default.object().keys({
            id: joi_1.default.string().length(24).hex().required(),
        }),
    },
    getOne: {
        params: joi_1.default.object().keys({
            id: joi_1.default.string().length(24).hex().required(),
        }),
    },
    getAll: {},
    sendMessage: {
        params: joi_1.default.object().keys({
            roomId: joi_1.default.string().length(24).hex().required(),
        }),
        body: joi_1.default.object().keys({
            text: joi_1.default.string().min(1).max(500).required(),
        }),
    },
    readMessages: {
        params: joi_1.default.object().keys({
            roomId: joi_1.default.string().length(24).hex().required(),
        }),
    },
};
//# sourceMappingURL=ChatValidators.js.map