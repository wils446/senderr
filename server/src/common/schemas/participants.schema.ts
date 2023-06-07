import Joi from "joi";

export const participantsSchema = Joi.object({
	userId: Joi.string().required(),
	roomId: Joi.string().required(),
	role: Joi.string().required(),
});
