"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationMiddleware = void 0;
const response_1 = require("../utils/response");
const statusCodes_1 = require("../constants/statusCodes");
class ValidationMiddleware {
    static validate(schema, action) {
        return (req, res, next) => {
            const actionSchema = schema[action];
            if (!actionSchema) {
                next();
                return;
            }
            const errors = [];
            if (actionSchema.body) {
                const { error } = actionSchema.body.validate(req.body);
                if (error) {
                    errors.push(`Body: ${error.details.map((d) => d.message).join(", ")}`);
                }
            }
            if (actionSchema.params) {
                const { error } = actionSchema.params.validate(req.params);
                if (error) {
                    errors.push(`Params: ${error.details.map((d) => d.message).join(", ")}`);
                }
            }
            if (actionSchema.query) {
                const { error } = actionSchema.query.validate(req.query);
                if (error) {
                    errors.push(`Query: ${error.details.map((d) => d.message).join(", ")}`);
                }
            }
            if (errors.length > 0) {
                response_1.ResponseUtil.error(res, `Validation error: ${errors.join("; ")}`, statusCodes_1.HTTP_STATUS.BAD_REQUEST);
                return;
            }
            next();
        };
    }
}
exports.ValidationMiddleware = ValidationMiddleware;
//# sourceMappingURL=ValidationMiddleware.js.map