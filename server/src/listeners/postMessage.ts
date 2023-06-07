import { UnauthorizedError } from "@errors";
import { SocketListener } from "@src/@types";

type Props = { message: string; roomId: string };

export class PostMessageListener {
	static listenerName = "post message";

	static execute: SocketListener<Props> = async (socket, { roomId }) => {
		try {
			if (!socket.data.user) throw new UnauthorizedError();

			socket.to(roomId).emit("receive message", { roomId });
		} catch (err) {
			console.log(err);
		}
	};
}
