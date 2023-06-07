import { SocketData } from "@src/@types";
import { UnauthorizedError } from "@errors";
import { UserService } from "@services";
import { Server } from "socket.io";
import { socketAuthentication } from "@middlewares";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { socketListenerInit } from "./socketListenerInit";
import { socketUsers } from "./socketUsers";

export async function socketInit(
	io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, SocketData>
): Promise<void> {
	io.use(socketAuthentication).on("connection", async (socket) => {
		const { user: socketUser } = socket.data;
		if (!socketUser) throw new UnauthorizedError();
		socketUsers[socketUser.id] = socket.id;
		console.log(socketUsers);

		const userService = new UserService();
		const user = await userService.getUser(socketUser.id);
		user.rooms.forEach((room) => {
			socket.join(room.id);
		});

		//register listener
		await socketListenerInit(socket);
	});
}
