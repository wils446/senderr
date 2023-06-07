import { UnauthorizedError } from "@errors";
import { SuperRequestHandler } from "@src/@types";
import { RoomService } from "@services";

type reqParams = {
	id: string;
};

export const getRoomById: SuperRequestHandler<{ Params: reqParams }> = async (req, res, next) => {
	try {
		if (!req.user) throw new UnauthorizedError(); // check auth

		const { id: userId } = req.user;
		const { id: roomId } = req.params;

		const roomMessage = new RoomService();
		const room = await roomMessage.getRoomById(userId, roomId);

		res.status(200).json({ room });
	} catch (err) {
		next(err);
	}
};
