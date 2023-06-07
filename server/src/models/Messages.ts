import { Model, Pojo, Validator, ValidatorArgs } from "objection";
import { messagesSchema } from "../common/schemas";
import { ValidationError } from "../errors";

export class Messages extends Model {
	public id!: string;
	public userId!: string;
	public roomId!: string;
	public message!: string;
	public createdAt!: Date;
	public updatedAt!: Date;

	static get tableName() {
		return "messages";
	}

	static createValidator(): Validator {
		return new MessagesValidator();
	}
}

class MessagesValidator extends Validator {
	validate(args: ValidatorArgs): Pojo {
		const data = args.json;

		const validate = messagesSchema.validate(data);
		if (validate.error) throw new ValidationError(validate.error.details[0].message);

		return data;
	}
}
