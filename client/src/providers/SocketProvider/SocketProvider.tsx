import { usePathname } from "next/navigation";
import { createContext, useContext } from "react";
import { Socket } from "socket.io-client";
import { ApiContext } from "../ApiProvider";
import { io } from "socket.io-client";

export const SocketContext = createContext<Socket>({} as Socket);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const path = usePathname();

	if (!path.startsWith("/room")) return <>{children}</>;

	const { tokenManager } = useContext(ApiContext);

	const url = process.env.NEXT_PUBLIC_API_BASE_URL as string;
	const token = tokenManager.getJwtToken();
	if (!token) return <>{children}</>;
	const socket = io(url, { query: { token } });

	return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};
