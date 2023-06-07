import { UnauthorizedError } from "@errors";
import { UserService } from "@services";
import { SuperRequestHandler } from "@src/@types";

export const getUser: SuperRequestHandler = async (req, res, next) => {
	try {
		if (!req.user) throw new UnauthorizedError(); // check auth

		const { id: userId } = req.user;

		const userService = new UserService();
		const user = await userService.getUser(userId);

		res.status(200).json({ user });
	} catch (err) {
		next(err);
	}
};
