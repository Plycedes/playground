import Joi from "joi";

export const validateUserCreation = (data: any) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        name: Joi.string().min(2).required(),
    });
    return schema.validate(data);
};

export const validateLogin = (data: any) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });
    return schema.validate(data);
};
