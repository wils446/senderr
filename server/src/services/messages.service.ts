import { Messages, Participants, Rooms, Users } from "@models";

export class MessageService {
	/**
	 * get all message by room id
	 * @param {string} roomId
	 * @returns {Promise<Messages[]>}
	 */
	async getMessageByRoomId(roomId: string): Promise<Messages[]> {
		const message = await Messages.query().select().where({ roomId });

		return message;
	}

	/**
	 * insert message to database
	 * @param {string} roomId
	 * @param {string} userId
	 * @param {string} message
	 */
	async postMessage(roomId: string, userId: string, message: string): Promise<void> {
		await Messages.query().insert({ roomId, userId, message });
	}

	/**
	 * get last message from all user
	 * @param {string} userId
	 * @returns {Promise<Messages[]>}
	 */
	async getLastMessageFromAllRooms(userId: string): Promise<Messages[]> {
		const participants = await Participants.query().select().where({ userId });

		const messages = await Messages.query()
			.select("messages.roomId", "message", "messages.createdAt")
			.distinctOn("messages.roomId")
			.orderBy("messages.roomId")
			.orderBy("messages.createdAt", "DESC")
			.whereIn(
				"messages.roomId",
				participants.map((par) => par.roomId)
			)
			.join(Rooms.tableName, "rooms.id", "messages.roomId")
			.join(Participants.tableName, "rooms.id", "participants.roomId")
			.whereNot("participants.userId", userId)
			.join(Users.tableName, "users.id", "participants.userId")
			.select({ roomName: "users.username" })
			.where("rooms.type", "personal");

		return messages;
	}
}
