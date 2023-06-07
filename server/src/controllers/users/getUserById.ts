import { SuperRequestHandler } from "@src/@types";
import { UnauthorizedError } from "@errors";
import { UserService } from "@services";

type Params = {
	id: string;
};

export const getUserById: SuperRequestHandler<{ Params: Params }> = async (req, res, next) => {
	try {
		if (!req.user) throw new UnauthorizedError(); // check auth

		const { id: userId } = req.params;

		const userService = new UserService();
		const user = await userService.getUserById(userId);

		res.status(200).json({ user });
	} catch (err) {
		next(err);
	}
};
