import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { SocketData } from "./SocketData";

export type SocketListener<T = void> = (
	socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, SocketData>,
	props: T
) => Promise<void>;
