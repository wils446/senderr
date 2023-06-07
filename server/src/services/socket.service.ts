import { Server } from "socket.io";

export class SocketService {
	constructor(private io: Server, roomId: string) {}
}
