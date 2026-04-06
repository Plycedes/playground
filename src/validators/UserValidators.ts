import Joi from "joi";

export const UserSchema = {
    register: {
        body: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
            name: Joi.string().min(2).required(),
        }),
    },

    login: {
        body: Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        }),
    },
};
