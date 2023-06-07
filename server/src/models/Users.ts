import {
	Model,
	Pojo,
	QueryBuilder,
	RelationMappings,
	RelationMappingsThunk,
	Validator,
	ValidatorArgs,
} from "objection";
import { UsersSchema } from "../common/schemas";
import { ValidationError } from "../errors";

export class Users extends Model {
	public id!: string;
	public username!: string;
	public description!: string;
	public email!: string;
	public password!: string;
	public createdAt!: Date;
	public updatedAt!: Date;

	static get tableName() {
		return "users";
	}

	static createValidator() {
		return new UsersValidator();
	}

	static modelPaths: string[] = ["Users"];

	static get modifiers() {
		return {
			selectUserWithoutPassword(builder: QueryBuilder<Users, Users[]>) {
				const { ref } = Users;
				builder.select(
					ref("id"),
					ref("username"),
					ref("description"),
					ref("email"),
					ref("createdAt"),
					ref("updatedAt")
				);
			},
			selectUserName(builder: QueryBuilder<Users, Users[]>) {
				const { ref } = Users;
				builder.select(ref("id"), ref("username"));
			},
		};
	}

	static relationMappings: RelationMappings | RelationMappingsThunk = {
		rooms: {
			relation: Model.ManyToManyRelation,
			modelClass: __dirname + "/Rooms",
			join: {
				from: "users.id",
				through: {
					from: "participants.userId",
					to: "participants.roomId",
				},
				to: "rooms.id",
			},
		},
	};
}

class UsersValidator extends Validator {
	validate(args: ValidatorArgs): Pojo {
		const data = args.json;

		const validate = UsersSchema.validate(data);
		if (validate.error) throw new ValidationError(validate.error.details[0].message);

		return data;
	}
}
