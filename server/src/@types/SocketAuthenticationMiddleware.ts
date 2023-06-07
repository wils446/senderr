import { Socket } from "socket.io";
import { ExtendedError } from "socket.io/dist/namespace";
import { DefaultEventsMap, EventsMap } from "socket.io/dist/typed-events";
import { SocketData } from "./SocketData";

export type SocketAuthenticationMiddleware = <
	ListenEvents extends EventsMap = DefaultEventsMap,
	EmitEvents extends EventsMap = ListenEvents,
	ServerSideEvents extends EventsMap = DefaultEventsMap
>(
	socket: Socket<ListenEvents, EmitEvents, ServerSideEvents, SocketData>,
	next: (err?: ExtendedError) => void
) => void;
