import { AxiosInstance } from "axios";

export class TokenManager {
	private itemKey = "jwtToken";

	constructor(private client: AxiosInstance) {}

	private checkWindowType = () => {
		if (typeof window === "undefined") return false;
		return true;
	};

	setJwtToken(token: string) {
		if (!this.checkWindowType()) return;
		localStorage.setItem(this.itemKey, token);

		this.client.defaults.headers.common.Authorization = `Bearer ${token}`;
	}

	getJwtToken() {
		if (!this.checkWindowType()) return;
		return localStorage.getItem(this.itemKey) || "";
	}

	resetJwtToken() {
		if (!this.checkWindowType()) return;
		localStorage.removeItem(this.itemKey);
	}
}

export class Auth {
	constructor(private client: AxiosInstance) {}

	login = async (email: string, password: string) => {
		const response = await this.client.post("/auth/login", { email, password });

		return response.data;
	};

	register = async (username: string, email: string, password: string) => {
		const response = await this.client.post("/auth/register", { username, email, password });

		console.log(response.data);
	};

	test = async () => {
		const response = await this.client.get("/test");

		console.log(response.status, response.data);
	};
}
