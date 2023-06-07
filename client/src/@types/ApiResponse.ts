export type TimeStamp = {
	createdAt: Date;
	updatedAt: Date;
};

export type User = {
	id: string;
	username: string;
	description: string;
	email: string;
	password: string;
} & TimeStamp;

export type Room = {
	id: string;
	name: string;
	type: "personal" | "group";
} & TimeStamp;

export type Participant = {
	id: string;
	roomId: string;
	userId: string;
	role: "member" | "admin" | "owner";
} & TimeStamp;

export type Message = {
	id: string;
	roomId: string;
	userId: string;
	message: string;
} & TimeStamp;

export type IUserResponse = {
	rooms: Room[];
} & Omit<User, "password">;

export type IRoomResponse = {
	participants: Participant[];
} & Room;

export type IGetLastMessage = {
	roomId: string;
	message: string;
	createdAt: Date;
	roomName: string;
};

export type IMessage = {
	id: string;
	userId: string;
	roomId: string;
	message: string;
	createdAt: Date;
	updatedAt: Date;
};

export type IGetLastMessageFromAllRooms = {
	list: IGetLastMessage[];
};

export type IGetRoomById = Room & {
	participants: Participant[];
	messages: Message[];
};
