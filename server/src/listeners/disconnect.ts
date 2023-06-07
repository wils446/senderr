import { SocketListener } from "@src/@types";
import { UnauthorizedError } from "@src/errors";
import { socketUsers } from "@src/socket/socketUsers";

export class DisconnectListener {
	static listenerName = "disconnect";

	static execute: SocketListener = async (socket) => {
		try {
			if (!socket.data.user) throw new UnauthorizedError();

			await delete socketUsers[socket.data.user.id];
			console.log(socketUsers);
		} catch (err) {
			console.log(err);
		}
	};
}
