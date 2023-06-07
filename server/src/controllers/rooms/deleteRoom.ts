import { UnauthorizedError } from "@errors";
import { SuperRequestHandler } from "@src/@types";
import { RoomService } from "@services";

type Params = {
	id: string;
};

export const deleteRoom: SuperRequestHandler<{ Params: Params }> = async (req, res, next) => {
	try {
		if (!req.user) throw new UnauthorizedError(); // check auth

		const { id: userId } = req.user;
		const { id: roomId } = req.params;

		const roomService = new RoomService();
		await roomService.deleteRoom(roomId, userId);

		res.status(200).send();
	} catch (err) {
		next(err);
	}
};
