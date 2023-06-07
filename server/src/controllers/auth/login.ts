import { SuperRequestHandler } from "@src/@types/SuperRequestHandler";
import { AuthService } from "@services";

type ReqBody = {
	email: string;
	password: string;
};

export const login: SuperRequestHandler<{ ReqBody: ReqBody }> = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		const authService = new AuthService();
		const jwt = await authService.login(email, password);

		res.status(200).json({ jwt });
	} catch (err) {
		next(err);
	}
};
