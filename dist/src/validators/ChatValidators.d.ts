import Joi from "joi";
export declare const ChatSchema: {
    create: {
        body: Joi.ObjectSchema<any>;
    };
    join: {
        params: Joi.ObjectSchema<any>;
    };
    leave: {
        params: Joi.ObjectSchema<any>;
    };
    getOne: {
        params: Joi.ObjectSchema<any>;
    };
    getAll: {};
    sendMessage: {
        params: Joi.ObjectSchema<any>;
        body: Joi.ObjectSchema<any>;
    };
    readMessages: {
        params: Joi.ObjectSchema<any>;
    };
};
//# sourceMappingURL=ChatValidators.d.ts.map