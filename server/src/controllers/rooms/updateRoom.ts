import { UnauthorizedError } from "@errors";
import { SuperRequestHandler } from "@src/@types";
import { RoomService } from "@services";

type Params = {
	id: string;
};

type ReqBody = {
	newName: string;
};

export const updateRoom: SuperRequestHandler<{ ReqBody: ReqBody; Params: Params }> = async (
	req,
	res,
	next
) => {
	try {
		if (!req.user) throw new UnauthorizedError(); // check auth

		const { id: userId } = req.user;
		const { newName } = req.body;
		const { id: roomId } = req.params;

		const roomService = new RoomService();
		const room = await roomService.updateRoom(userId, roomId, newName);

		res.status(200).json({ room });
	} catch (err) {
		next(err);
	}
};
