import { Request, Response, NextFunction } from "express";
import Joi from "joi";
interface ValidationSchema {
    body?: Joi.ObjectSchema;
    params?: Joi.ObjectSchema;
    query?: Joi.ObjectSchema;
}
interface ValidationSchemas {
    [key: string]: ValidationSchema;
}
export declare class ValidationMiddleware {
    static validate(schema: ValidationSchemas, action: string): (req: Request, res: Response, next: NextFunction) => void;
}
export {};
//# sourceMappingURL=ValidationMiddleware.d.ts.map