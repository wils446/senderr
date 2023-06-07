import { UnauthorizedError } from "@errors";
import { SuperRequestHandler } from "@src/@types";
import { RoomService } from "@services";

type reqBody = {
	targetUserId: string;
	name?: string;
	type: "personal" | "group";
};

export const createRoom: SuperRequestHandler<{ ReqBody: reqBody }> = async (req, res, next) => {
	try {
		if (!req.user) throw new UnauthorizedError(); // check auth

		const { id: userId } = req.user;
		const { targetUserId, name, type } = req.body;

		const roomService = new RoomService();
		const room = await roomService.createRoom(userId, targetUserId, type, name);

		res.status(200).json({ room });
	} catch (err) {
		next(err);
	}
};
