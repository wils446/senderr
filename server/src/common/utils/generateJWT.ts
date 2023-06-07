import jwt from "jsonwebtoken";

export const generateJWT = async (userId: string) => {
	const PRIVATE_KEY = process.env.JWT_PRIVATE_KEY as string;

	return await jwt.sign({ id: userId }, PRIVATE_KEY);
};
