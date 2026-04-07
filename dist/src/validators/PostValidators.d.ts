import Joi from "joi";
export declare const PostSchema: {
    create: {
        body: Joi.ObjectSchema<any>;
    };
    update: {
        params: Joi.ObjectSchema<any>;
        body: Joi.ObjectSchema<any>;
    };
    getOne: {
        params: Joi.ObjectSchema<any>;
    };
    deleteOne: {
        params: Joi.ObjectSchema<any>;
    };
    getAll: {};
};
//# sourceMappingURL=PostValidators.d.ts.map