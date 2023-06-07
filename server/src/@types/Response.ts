import { Rooms } from "@src/models";

interface TimeStamp {
	createdAt: Date;
	updatedAt: Date;
}

export interface User extends TimeStamp {
	id: string;
	username: string;
	email: string;
	description: string;
	password: string;
}

export interface Room extends TimeStamp {
	id: string;
	name: string;
	type: "personal" | "group";
}

export interface Participant extends TimeStamp {
	id: string;
	roomId: string;
	userId: string;
	role: "member" | "admin" | "owner";
}

export interface Message extends TimeStamp {
	id: string;
	roomId: string;
	userId: string;
	message: string;
}

export interface GetUserResponse extends Omit<User, "password"> {
	rooms: Room[];
}

export interface GetRoomByIdResponse extends Rooms {
	participants: Participant[];
	messages: Message[];
}

export interface getLastMessageFromAllRooms {
	lists: LastMessageFromAllRooms[];
}

export interface LastMessageFromAllRooms {
	roomId: string;
	message: string;
	createdAt: Date;
}
