import { UnauthorizedError } from "@errors";
import { SuperRequestHandler } from "@src/@types";
import { RoomService } from "@services";

type ReqParams = {
	roomId: string;
};

export const isUserInRoom: SuperRequestHandler<{ Params: ReqParams }> = async (req, res, next) => {
	try {
		if (!req.user) throw new UnauthorizedError();

		const { id: userId } = req.user;
		const { roomId } = req.params;

		const roomService = new RoomService();
		await roomService.isUserInRoom(roomId, userId);

		next();
	} catch (err) {
		next(err);
	}
};
