"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandlerMiddleware = void 0;
const logger_1 = require("../utils/logger");
const response_1 = require("../utils/response");
const statusCodes_1 = require("../constants/statusCodes");
class ErrorHandlerMiddleware {
    static handle(error, req, res, next) {
        logger_1.logger.error("Error occurred:", error);
        if (error.message.includes("Validation")) {
            response_1.ResponseUtil.error(res, error.message, statusCodes_1.HTTP_STATUS.BAD_REQUEST);
            return;
        }
        if (error.message === "User already exists" || error.message === "Invalid credentials") {
            response_1.ResponseUtil.error(res, error.message, statusCodes_1.HTTP_STATUS.BAD_REQUEST);
            return;
        }
        response_1.ResponseUtil.error(res, "Internal server error", statusCodes_1.HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }
}
exports.ErrorHandlerMiddleware = ErrorHandlerMiddleware;
//# sourceMappingURL=errorHandler.js.map