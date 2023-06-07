import { SocketListener } from "@src/@types";
import { BadRequest, UnauthorizedError } from "@src/errors";
import { RoomService } from "@src/services";

type Props = {
	roomId: string;
};

export class JoinRoomListener {
	static listenerName = "join room";

	static execute: SocketListener<Props> = async (socket, { roomId }) => {
		if (!socket.data.user) throw new UnauthorizedError();

		const userId = socket.data.user?.id;

		const roomService = new RoomService();
		const room = await roomService.getRoomById(userId, roomId);
		if (!room || !room.participants.map((par) => par.userId).includes(userId))
			throw new BadRequest("User are not in the room");

		const userRoomId = socket.rooms.has(roomId);
		if (!userRoomId) socket.join(roomId);
	};
}
