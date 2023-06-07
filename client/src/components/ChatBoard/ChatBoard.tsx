import { RoomContext, SocketContext, UserContext } from "@/providers";
import { RefObject, useContext } from "react";
import { ChatBallon } from "../ChatBallon";
import { scrollToBottom } from "@/lib/utils";

type ChatBoardProps = {
	boardScrollRef: RefObject<HTMLDivElement>;
};

export const ChatBoard: React.FC<ChatBoardProps> = ({ boardScrollRef }) => {
	const { messages, refresh, id } = useContext(RoomContext);
	const { id: userId } = useContext(UserContext);
	const socket = useContext(SocketContext);

	socket.on("receive message", ({ roomId }) => {
		if (roomId === id) {
			refresh();
			scrollToBottom(boardScrollRef);
		}
	});

	return (
		<div className="h-full w-full flex flex-col flex-nowrap px-5 py-4">
			{messages &&
				messages.map((message) => (
					<ChatBallon key={message.id} message={message.message} isOwnChat={message.userId === userId} />
				))}
		</div>
	);
};
