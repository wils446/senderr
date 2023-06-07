import { BadRequest, ForbiddenError, NotFoundError, ValidationError } from "@errors";
import { Participants, Rooms, Users } from "@models";
import { GetRoomByIdResponse } from "@src/@types";

export class RoomService {
	/**
	 * create chat room
	 * @param {string} userId
	 * @param {string} targetUserId
	 * @param {"personal" | "group"} type
	 * @param {string} name
	 * @returns {Promise<Rooms>}
	 */
	async createRoom(
		userId: string,
		targetUserId: string,
		type: "personal" | "group",
		name?: string
	): Promise<GetRoomByIdResponse> {
		if (targetUserId === userId) throw new BadRequest("can't target to yourself");
		if (type === "group" && name === "") throw new ValidationError("group name required!");
		if (type === "personal" && targetUserId === "")
			throw new ValidationError("target user required!");

		// if type room group, targetUserId is optional
		if (targetUserId && type === "personal") {
			const isTargetExist = await Users.query().findById(targetUserId);
			if (!isTargetExist) throw new NotFoundError("Target user not found");

			// check are personal chat room is exist or not
			const isRoomExistId = await this.isRoomExistWithParticipantId(userId, targetUserId);
			if (isRoomExistId) return await this.getRoomById(userId, isRoomExistId);
		}

		const newRoom = await Rooms.query().insert({ name: name || "personal", type }); // insert data to rooms
		await Participants.query().insert({
			roomId: newRoom.id,
			userId,
			role: type === "group" ? "owner" : "member",
		});
		if (targetUserId)
			await Participants.query().insert({
				roomId: newRoom.id,
				userId: targetUserId,
				role: "member",
			});

		const room = await this.getRoomById(userId, newRoom.id);

		return room;
	}

	/**
	 * check are personal chat room is exist or not
	 * @param {string} userId
	 * @param {string} targetUserId
	 * @returns {Promise<string>}
	 */
	private async isRoomExistWithParticipantId(
		userId: string,
		targetUserId: string
	): Promise<string> {
		let roomId = "";
		const participants = await Participants.query()
			.from((builder) => {
				builder
					.from(Participants.tableName)
					.select("roomId")
					.count("roomId", { as: "roomCount" })
					.groupBy("roomId")
					.as("room");
			})
			.join(Participants.tableName, "room.roomId", "participants.roomId")
			.where("roomCount", 2)
			.whereIn("userId", [userId, targetUserId]);

		participants.forEach((participant) => {
			if (participants.filter((par) => par.roomId === participant.roomId).length === 2)
				roomId = participant.roomId;
		});

		return roomId;
	}

	/**
	 * get room by id
	 * @param {string} userId
	 * @param {string} roomId
	 * @returns {Promise<GetRoomByIdResponse>}
	 */
	async getRoomById(userId: string, roomId: string): Promise<GetRoomByIdResponse> {
		const room = await Rooms.query()
			.findById(roomId)
			.withGraphFetched("participants")
			.modifyGraph("participants", "selectUserName")
			.withGraphFetched("messages"); // get room from table rooms
		if (!room) throw new NotFoundError("Room not found"); // throw not found error if user didn't exist
		const isUserInRoom = room.$relatedQuery("participants").where("userId", userId); // get the user from room
		if (!isUserInRoom) throw new NotFoundError("Room not found"); // check are user in room with that room id or not

		return room as GetRoomByIdResponse;
	}

	/**
	 * delete room
	 * @param {string} roomId
	 * @param {string} userId
	 */
	async deleteRoom(roomId: string, userId: string): Promise<void> {
		const room = await Rooms.query().findById(roomId); // get room from table rooms
		const user = await Participants.query().findOne({ roomId, userId }); // get user from table participants

		if (!room || !user) throw new BadRequest("room didn't exist"); // check if room exist or are user in the room
		if (room.type != "group") throw new BadRequest("can't delete personal room"); // check room type, can't process delete to personal chat room
		if (user.role !== "owner") throw new ForbiddenError("you don't have permission for do it"); // check user role, only owner can delete chat room

		await Rooms.query().deleteById(roomId); // process delete room from database
	}

	/**
	 * update room chat
	 * @param {string} userId
	 * @param {string} roomId
	 * @param {string} newName
	 * @returns {Promise<Rooms>}
	 */
	async updateRoom(userId: string, roomId: string, newName: string): Promise<Rooms> {
		const room = await Rooms.query().findById(roomId); // get room from table rooms
		const userInRoom = await Participants.query().select().where({ roomId, userId }); // get user from table participants

		if (!userInRoom || !room) throw new NotFoundError("chat room not found!"); // check if room exist or are user in room or not
		if (room.type === "personal") throw new BadRequest("cant update personal room"); // check room type, update can only on group room
		if (!newName.length) throw new BadRequest("room name required!"); // throw error if update title is blank string

		const newRoom = await Rooms.query().patchAndFetchById(roomId, {
			name: newName,
			type: room.type,
		});

		return newRoom;
	}

	/**
	 *
	 * @param {string} roomId
	 * @param {string} userId
	 */
	async isUserInRoom(roomId: string, userId: string): Promise<void> {
		const room = await Rooms.query().findById(roomId);
		if (!room) throw new NotFoundError("room didn't exist");

		const isUserInRoom = room.$relatedQuery("participants").where("userId", userId);
		if (!isUserInRoom) throw new BadRequest("room didn't exist");
	}

	/**
	 * join group
	 * @param {string} roomId
	 * @param {string} userId
	 */
	async joinGroup(roomId: string, userId: string): Promise<void> {
		const isUserInGroup = await Participants.query().findOne({ roomId, userId });
		if (isUserInGroup) throw new BadRequest("user already in group.");

		await Participants.query().insert({ userId, roomId, role: "member" });
	}

	/**
	 * leave group
	 * @param {string} roomId
	 * @param {string} userId
	 */
	async leaveGroup(roomId: string, userId: string): Promise<void> {
		const isUserInGroup = await Participants.query().findOne({ roomId, userId });
		if (!isUserInGroup) throw new BadRequest("room doesn't exist");

		await Participants.query().deleteById(isUserInGroup.id);
	}
}
