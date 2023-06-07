import { BadRequest, ConflictError, UnauthorizedError } from "@errors";
import { Users } from "@models";
import bycript from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {
	/**
	 * user login
	 * @param {string} email
	 * @param {string} password
	 * @returns {Promise<string>}
	 */
	async login(email: string, password: string): Promise<string> {
		// check if email registered
		const user = await Users.query().findOne({ email });
		if (!user?.id) throw new BadRequest("Email have not registered!");

		const passwordCheck = await this.verifyPassword(password, user.password);
		if (!passwordCheck) throw new UnauthorizedError("Incorrect password!");

		const jwt = await this.generateJWT(user.id);

		return jwt;
	}

	/**
	 * register user
	 * @param {string} username
	 * @param {string} description
	 * @param {string} email
	 * @param {string} password
	 * @returns {Promise<Users>}
	 */
	async register(
		username: string,
		description: string,
		email: string,
		password: string
	): Promise<Users> {
		// check if email already in use
		const isEmailExist = !!(await Users.query().findOne({ email }));
		if (isEmailExist) throw new ConflictError("Email already exist!");

		const hashedPassword = await this.hashPassword(password);
		const newUser = await Users.query().insert({
			username,
			description,
			email,
			password: hashedPassword,
		});

		return newUser;
	}

	/**
	 * verify password using bycript
	 * @param {string} password
	 * @param {string} hashedPassword
	 * @returns {Promise<boolean>}
	 */
	private async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
		return await bycript.compare(password, hashedPassword);
	}

	/**
	 * generate jwt
	 * @param {string} userId
	 * @returns {Promise<string>}
	 */
	private async generateJWT(userId: string): Promise<string> {
		const PRIVATE_KEY = process.env.JWT_PRIVATE_KEY as string;

		return await jwt.sign({ id: userId }, PRIVATE_KEY);
	}

	/**
	 * hash password
	 * @param {string} text
	 * @returns {Promise<string>}
	 */
	private async hashPassword(text: string): Promise<string> {
		return await bycript.hash(text, 10);
	}
}
