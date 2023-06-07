import { SocketListener } from "@src/@types";
import { UnauthorizedError } from "@src/errors";
import { RoomService } from "@src/services";

type Props = {
	roomId: string;
};

export class JoinGroupListener {
	static listenerName = "join group";

	static execute: SocketListener<Props> = async (socket, { roomId }) => {
		try {
			if (!socket.data.user) throw new UnauthorizedError();

			const userId = socket.data.user?.id;

			const roomService = new RoomService();
			await roomService.joinGroup(roomId, userId);
			await socket.join(roomId);

			socket.to(roomId).emit("userJoin", { userId });
		} catch (err) {
			console.log(err);
		}
	};
}
