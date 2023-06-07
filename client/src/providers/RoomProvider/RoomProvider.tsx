import { IGetRoomById } from "@/@types/ApiResponse";
import { useParams } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { ApiContext } from "../ApiProvider";
import { UserContext } from "../UserProvider";

type IRoomContext = {
	refresh: () => void;
} & IGetRoomById;

export const RoomContext = createContext<IRoomContext>({} as IRoomContext);

export const RoomProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const { roomId } = useParams();

	if (!roomId) return <>{children}</>;

	const { room: roomApi, user } = useContext(ApiContext);
	const { id: currentUserId } = useContext(UserContext);
	const [room, setRoom] = useState<IGetRoomById>();

	const getRoom = () => {
		roomApi.getRoomById(roomId).then((response) => {
			if (response.type !== "personal") setRoom(response);
			else {
				user
					.getUserById(response.participants.filter((user) => user.id !== currentUserId)[0].id)
					.then((userResponse) => {
						response.name = userResponse.user.username;
						setRoom(response);
					});
			}
		});
	};

	useEffect(() => {
		getRoom();
	}, [roomId]);

	if (!room) return <>{children}</>;

	return <RoomContext.Provider value={{ ...room, refresh: getRoom }}>{children}</RoomContext.Provider>;
};
