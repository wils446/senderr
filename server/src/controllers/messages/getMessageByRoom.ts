import { UnauthorizedError } from "@errors";
import { SuperRequestHandler } from "@src/@types";
import { MessageService } from "@services";

type ReqParams = {
	roomId: string;
};

export const getMessageByRoom: SuperRequestHandler<{ Params: ReqParams }> = async (
	req,
	res,
	next
) => {
	try {
		if (!req.user) throw new UnauthorizedError(); // check auth

		const { roomId } = req.params;

		const messageService = new MessageService();
		const message = await messageService.getMessageByRoomId(roomId);

		res.status(200).json({ message });
	} catch (err) {
		next(err);
	}
};
