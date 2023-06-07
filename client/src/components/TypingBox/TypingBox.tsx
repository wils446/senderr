import { KeyboardEvent, RefObject, useContext, useState } from "react";
import { Button } from "../Button/Button";
import { ApiContext, RoomContext, SocketContext } from "@/providers";
import { scrollToBottom } from "@/lib/utils";

type TypingBoxProps = {
	boardScrollRef: RefObject<HTMLDivElement>;
};

export const TypingBox: React.FC<TypingBoxProps> = ({ boardScrollRef }) => {
	const { message } = useContext(ApiContext);
	const { id: roomId, refresh } = useContext(RoomContext);
	const [inputMessage, setInputMessage] = useState("");
	const socket = useContext(SocketContext);

	const sendButtonHandler = () => {
		message
			.postMessage(roomId, inputMessage)
			.then(() => socket.emit("post message", { roomId }))
			.then(() => refresh())
			.then(() => setInputMessage(""))
			.then(() => scrollToBottom(boardScrollRef));
	};

	const onKeydownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" && inputMessage.length != 0) sendButtonHandler();
	};

	return (
		<div className="basis-1/12 flex items-center p-4 bg-gray-800">
			<input
				type="text"
				className="w-full h-8 rounded-sm outline-none text-black px-3 bg-opacity-90"
				placeholder="type your message here..."
				onChange={(e) => setInputMessage(e.target.value)}
				onKeyDown={onKeydownHandler}
				value={inputMessage}
			/>
			<Button color="green" size={"small"} onClick={sendButtonHandler} disabled={!inputMessage.length}>
				send
			</Button>
		</div>
	);
};
