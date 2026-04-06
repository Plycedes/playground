import Joi from "joi";

export const ChatSchema = {
    create: {
        body: Joi.object().keys({
            name: Joi.string().min(1).max(100).required(),
        }),
    },

    join: {
        params: Joi.object().keys({
            id: Joi.string().length(24).hex().required(),
        }),
    },

    leave: {
        params: Joi.object().keys({
            id: Joi.string().length(24).hex().required(),
        }),
    },

    getOne: {
        params: Joi.object().keys({
            id: Joi.string().length(24).hex().required(),
        }),
    },

    getAll: {},

    sendMessage: {
        params: Joi.object().keys({
            roomId: Joi.string().length(24).hex().required(),
        }),
        body: Joi.object().keys({
            text: Joi.string().min(1).max(500).required(),
        }),
    },

    readMessages: {
        params: Joi.object().keys({
            roomId: Joi.string().length(24).hex().required(),
        }),
    },
};
