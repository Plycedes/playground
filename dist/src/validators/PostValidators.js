"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.PostSchema = {
    create: {
        body: joi_1.default.object().keys({
            text: joi_1.default.string().min(1).max(1000).required(),
        }),
    },
    update: {
        params: joi_1.default.object().keys({
            id: joi_1.default.string().length(24).hex().required(),
        }),
        body: joi_1.default.object().keys({
            text: joi_1.default.string().min(1).max(1000).required(),
        }),
    },
    getOne: {
        params: joi_1.default.object().keys({
            id: joi_1.default.string().length(24).hex().required(),
        }),
    },
    deleteOne: {
        params: joi_1.default.object().keys({
            id: joi_1.default.string().length(24).hex().required(),
        }),
    },
    getAll: {},
};
//# sourceMappingURL=PostValidators.js.map