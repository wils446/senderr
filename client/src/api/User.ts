import { IUserResponse } from "@/@types/ApiResponse";
import { AxiosInstance } from "axios";

type GetUserResponse = {
	user: IUserResponse;
};

export class User {
	constructor(private client: AxiosInstance) {}

	getUser = async (): Promise<GetUserResponse> => {
		const response = await this.client.get<GetUserResponse>("/users");

		return response.data;
	};

	getUserById = async (userId: string): Promise<GetUserResponse> => {
		const response = await this.client.get<GetUserResponse>(`/users/${userId}`);

		return response.data;
	};
}
