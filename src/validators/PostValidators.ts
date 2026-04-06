import Joi from "joi";

export const PostSchema = {
    create: {
        body: Joi.object().keys({
            text: Joi.string().min(1).max(1000).required(),
        }),
    },

    update: {
        params: Joi.object().keys({
            id: Joi.string().length(24).hex().required(),
        }),
        body: Joi.object().keys({
            text: Joi.string().min(1).max(1000).required(),
        }),
    },

    getOne: {
        params: Joi.object().keys({
            id: Joi.string().length(24).hex().required(),
        }),
    },

    deleteOne: {
        params: Joi.object().keys({
            id: Joi.string().length(24).hex().required(),
        }),
    },

    getAll: {},
};
