import { UnauthorizedError } from "@errors";
import { SuperRequestHandler } from "@src/@types";
import { MessageService } from "@services";

type ReqBody = {
	message: string;
};

type ReqParams = {
	roomId: string;
};

export const postMessage: SuperRequestHandler<{ ReqBody: ReqBody; Params: ReqParams }> = async (
	req,
	res,
	next
) => {
	try {
		if (!req.user) throw new UnauthorizedError(); // check auth

		const { id: userId } = req.user;
		const { message } = req.body;
		const { roomId } = req.params;

		const messageService = new MessageService();
		await messageService.postMessage(roomId, userId, message);
		const messages = await messageService.getMessageByRoomId(roomId);

		res.status(200).json({ messages });
	} catch (err) {
		next(err);
	}
};
