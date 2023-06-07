import Joi from "joi";

export const roomsSchema = Joi.object({
	name: Joi.string().required(),
	type: Joi.string().required(),
});
