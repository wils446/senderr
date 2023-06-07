import {
	Model,
	Pojo,
	RelationMappings,
	RelationMappingsThunk,
	Validator,
	ValidatorArgs,
} from "objection";
import { roomsSchema } from "../common/schemas";
import { ValidationError } from "../errors";

export class Rooms extends Model {
	public id!: string;
	public name!: string;
	public type!: "personal" | "group";
	public createdAt!: Date;
	public updatedAt!: Date;

	static get tableName() {
		return "rooms";
	}

	static createValidator(): Validator {
		return new RoomsValidator();
	}

	static modelPaths: string[] = ["Rooms"];

	static relationMappings: RelationMappings | RelationMappingsThunk = {
		participants: {
			relation: Model.ManyToManyRelation,
			modelClass: __dirname + "/Users",
			join: {
				from: "rooms.id",
				through: {
					from: "participants.roomId",
					to: "participants.userId",
				},
				to: "users.id",
			},
		},
		messages: {
			relation: Model.HasManyRelation,
			modelClass: __dirname + "/Messages",
			join: {
				from: "rooms.id",
				to: "messages.roomId",
			},
		},
	};
}

class RoomsValidator extends Validator {
	validate(args: ValidatorArgs): Pojo {
		const data = args.json;

		const validate = roomsSchema.validate(data);
		if (validate.error) throw new ValidationError(validate.error.details[0].message);

		return data;
	}
}
