import { SuperRequestHandler } from "@src/@types";
import { UnauthorizedError } from "@errors";
import { RoomService } from "@services";

type Params = {
	id: string;
};

export const joinGroup: SuperRequestHandler<{ Params: Params }> = async (req, res, next) => {
	try {
		if (!req.user) throw new UnauthorizedError();

		const { id: userId } = req.user;
		const { id: roomId } = req.params;

		const roomService = new RoomService();
		await roomService.joinGroup(roomId, userId);

		res.status(200).send();
	} catch (err) {
		next(err);
	}
};
