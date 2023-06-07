import { IGetLastMessageFromAllRooms, IMessage } from "@/@types/ApiResponse";
import { AxiosInstance } from "axios";

export class Message {
	constructor(private client: AxiosInstance) {}

	getLastMessageFromAllRooms = async (): Promise<IGetLastMessageFromAllRooms> => {
		const response = await this.client.get<IGetLastMessageFromAllRooms>("/message/last");

		return response.data;
	};

	postMessage = async (roomId: string, message: string): Promise<number> => {
		const response = await this.client.post(`/message/${roomId}`, {
			message,
		});

		return response.status;
	};

	getMessageByRoom = async (roomId: string): Promise<IMessage[]> => {
		const response = await this.client.get<{ message: IMessage[] }>(`/message/${roomId}`);

		return response.data.message;
	};
}
