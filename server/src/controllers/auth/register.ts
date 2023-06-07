import { SuperRequestHandler } from "@src/@types/SuperRequestHandler";
import { AuthService } from "@services";

type ReqBody = {
	username: string;
	description: string;
	email: string;
	password: string;
};

export const register: SuperRequestHandler<{ ReqBody: ReqBody }> = async (req, res, next) => {
	const { username, email, description, password } = req.body;

	try {
		const authService = new AuthService();
		const newUser = await authService.register(username, description, email, password);

		res.status(200).json({ user: newUser });
	} catch (err) {
		next(err);
	}
};
