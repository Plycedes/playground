import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { ResponseUtil } from "../utils/response";
import { HTTP_STATUS } from "../constants/statusCodes";

interface ValidationSchema {
    body?: Joi.ObjectSchema;
    params?: Joi.ObjectSchema;
    query?: Joi.ObjectSchema;
}

interface ValidationSchemas {
    [key: string]: ValidationSchema;
}

export class ValidationMiddleware {
    static validate(schema: ValidationSchemas, action: string) {
        return (req: Request, res: Response, next: NextFunction): void => {
            const actionSchema = schema[action];
            if (!actionSchema) {
                next();
                return;
            }

            const errors: string[] = [];

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
                ResponseUtil.error(
                    res,
                    `Validation error: ${errors.join("; ")}`,
                    HTTP_STATUS.BAD_REQUEST,
                );
                return;
            }

            next();
        };
    }
}
