import { IGetLastMessage } from "@/@types/ApiResponse";
import { ApiContext, SocketContext } from "@/providers";
import { useContext, useEffect, useState } from "react";
import { ContactBox } from "../ContactBox";
import { useRouter } from "next/navigation";

export const ContactList: React.FC = () => {
	const router = useRouter();
	const { message } = useContext(ApiContext);
	const [list, setList] = useState<IGetLastMessage[]>([]);

	const getLastMessageFromAllRooms = () => {
		message.getLastMessageFromAllRooms().then((response) => setList(response.list));
	};

	useEffect(() => {
		getLastMessageFromAllRooms();
	}, []);

	return (
		<div className="w-1/5 border-r-blue-950 bg-black bg-opacity-25 border-r-2 h-full overflow-y-auto flex flex-col resize-x">
			<div className="w-full px-5 py-5 border-b-2 border-blue-950">
				<input
					type="text"
					placeholder="search..."
					className="w-full rounded-lg bg-opacity-75 px-2 text-black outline-none py-1"
				/>
			</div>
			{list &&
				list.map((list) => (
					<ContactBox
						key={list.roomId}
						onClick={() => router.push(`/rooms/${list.roomId}`)}
						username={list.roomName}
						date={new Date(list.createdAt)}
					/>
				))}
		</div>
	);
};
