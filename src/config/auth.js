"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BCRYPT_CONFIG = exports.JWT_CONFIG = void 0;
exports.JWT_CONFIG = {
    SECRET: process.env.JWT_SECRET,
    EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1h',
};
exports.BCRYPT_CONFIG = {
    ROUNDS: parseInt(process.env.BCRYPT_ROUNDS || '12'),
};
//# sourceMappingURL=auth.js.map