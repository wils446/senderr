import { GetUserResponse } from "@src/@types";
import { NotFoundError, UnauthorizedError } from "@errors";
import { Users } from "@models";

export class UserService {
	/**
	 * get own user details
	 * @param {string} userId
	 * @returns {Promise<Users>}
	 */
	async getUser(userId: string): Promise<GetUserResponse> {
		const user = (await Users.query()
			.modify("selectUserWithoutPassword")
			.withGraphFetched("rooms")
			.findById(userId)) as unknown as GetUserResponse; // get user from table users
		if (!user) throw new UnauthorizedError("User not exist"); // throw error if user didn't exist

		return user;
	}

	/**
	 * get user by id
	 * @param {string} userId
	 * @returns {Promise<Users>}
	 */
	async getUserById(userId: string): Promise<Users> {
		const user = await Users.query().modify("selectUserWithoutPassword").findById(userId); // get user from table users
		if (!user) throw new NotFoundError("User didn't exist"); // throw error if user didn't exist

		return user;
	}
}
