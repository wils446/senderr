import { Model, Pojo, Validator, ValidatorArgs } from "objection";
import { participantsSchema } from "../common/schemas";
import { ValidationError } from "../errors";

export class Participants extends Model {
	public id!: string;
	public roomId!: string;
	public userId!: string;
	public role!: "member" | "admin" | "owner";
	public createdAt!: Date;
	public updatedAt!: Date;

	static get tableName() {
		return "participants";
	}

	static createValidator(): Validator {
		return new ParticipantsValidator();
	}
}

class ParticipantsValidator extends Validator {
	validate(args: ValidatorArgs): Pojo {
		const data = args.json;

		const validate = participantsSchema.validate(data);
		if (validate.error) throw new ValidationError(validate.error.details[0].message);

		return data;
	}
}
