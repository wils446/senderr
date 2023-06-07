import bycript from "bcrypt";

export const hashPassword = async (text: string): Promise<string> => {
	return await bycript.hash(text, 10);
};
