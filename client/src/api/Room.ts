import { IGetRoomById } from "@/@types/ApiResponse";
import { AxiosInstance } from "axios";

export class Room {
	constructor(private client: AxiosInstance) {}

	getRoomById = async (roomId: string): Promise<IGetRoomById> => {
		const response = await this.client.get<{ room: IGetRoomById }>(`/rooms/${roomId}`);

		return response.data.room;
	};
}
