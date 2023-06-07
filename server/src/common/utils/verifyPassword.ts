import bycript from "bcrypt";

export const verifyPassword = async (password: string, hashedPassword: string) => {
	return await bycript.compare(password, hashedPassword);
};
