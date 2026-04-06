import Joi from "joi";

export const ChatSchema = {
    sendMessage: {
        params: Joi.object().keys({
            roomId: Joi.string().min(1).max(100).required(),
        }),
        body: Joi.object().keys({
            text: Joi.string().min(1).max(500).required(),
        }),
    },

    readMessages: {
        params: Joi.object().keys({
            roomId: Joi.string().min(1).max(100).required(),
        }),
    },
};
