"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseUtil = void 0;
const statusCodes_1 = require("../constants/statusCodes");
class ResponseUtil {
    static success(res, data, message = "Success", statusCode = statusCodes_1.HTTP_STATUS.OK) {
        res.status(statusCode).json({
            success: true,
            message,
            data,
        });
    }
    static error(res, message, statusCode = statusCodes_1.HTTP_STATUS.INTERNAL_SERVER_ERROR) {
        res.status(statusCode).json({
            success: false,
            message,
        });
    }
}
exports.ResponseUtil = ResponseUtil;
//# sourceMappingURL=response.js.map