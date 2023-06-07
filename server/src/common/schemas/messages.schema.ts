import Joi from "joi";

export const messagesSchema = Joi.object({
	userId: Joi.string().required(),
	roomId: Joi.string().required(),
	message: Joi.string().required(),
});
