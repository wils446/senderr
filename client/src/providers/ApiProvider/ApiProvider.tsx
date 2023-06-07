"use client";

import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { usePathname, useRouter } from "next/navigation";
import React, { createContext } from "react";
import { Auth, TokenManager, User } from "../../api";
import { Message } from "@/api/Message";
import { Room } from "@/api/Room";

type ApiContextStore = {
	client: AxiosInstance;
	auth: Auth;
	tokenManager: TokenManager;
	user: User;
	message: Message;
	room: Room;
};

export const ApiContext = createContext<ApiContextStore>({} as ApiContextStore);

export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const router = useRouter();
	const pathname = usePathname();

	const validateStatus = (status: number) => {
		if (status === 401) {
			if (pathname.startsWith("/room")) router.push("");
		}

		if (status >= 500) return false;
		return true;
	};

	const requestInterceptors = (req: InternalAxiosRequestConfig) => {
		if (!req.headers.Authorization) {
			const token = tokenManager.getJwtToken();
			if (token) {
				req.headers.Authorization = `Bearer ${token}`;
				tokenManager.setJwtToken(token);
			}
		}
		return req;
	};

	const client = axios.create({
		baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
		validateStatus,
	});

	client.interceptors.request.use(requestInterceptors);

	const auth = new Auth(client);
	const tokenManager = new TokenManager(client);
	const user = new User(client);
	const message = new Message(client);
	const room = new Room(client);

	return (
		<ApiContext.Provider value={{ auth, client, tokenManager, user, message, room }}>{children}</ApiContext.Provider>
	);
};
