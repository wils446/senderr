import Joi from "joi";

export const UsersSchema = Joi.object({
	username: Joi.string().required(),
	description: Joi.string().required(),
	email: Joi.string().required(),
	password: Joi.string().required(),
});
