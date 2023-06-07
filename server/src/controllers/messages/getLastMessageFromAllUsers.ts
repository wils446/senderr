import { SuperRequestHandler } from "@src/@types";
import { UnauthorizedError } from "@src/errors";
import { MessageService } from "@src/services";

export const getLastMessageFromAllRooms: SuperRequestHandler = async (req, res, next) => {
	try {
		if (!req.user) throw new UnauthorizedError();

		const { id: userId } = req.user;

		const messageService = new MessageService();
		const messageLists = await messageService.getLastMessageFromAllRooms(userId);

		res.status(200).json({ list: messageLists });
	} catch (err) {
		next(err);
	}
};
