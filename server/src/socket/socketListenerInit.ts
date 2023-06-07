import { SocketData } from "@src/@types";
import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { JoinGroupListener, PostMessageListener, JoinRoomListener } from "@listeners";
import { DisconnectListener } from "@src/listeners/disconnect";

export const socketListenerInit = async (
	socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, SocketData>
) => {
	socket.on(JoinGroupListener.listenerName, ({ roomId }) =>
		JoinGroupListener.execute(socket, { roomId })
	);

	socket.on(PostMessageListener.listenerName, ({ message, roomId }) =>
		PostMessageListener.execute(socket, { message, roomId })
	);

	socket.on(JoinRoomListener.listenerName, ({ roomId }) =>
		JoinRoomListener.execute(socket, { roomId })
	);

	socket.on(DisconnectListener.listenerName, () => DisconnectListener.execute(socket));
};
