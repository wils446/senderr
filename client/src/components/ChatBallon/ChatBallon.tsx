import { cva } from "class-variance-authority";

const chatBallonVariants = cva("max-w-sm py-2 pl-2 pr-4 text-base rounded-lg text-lg", {
	variants: {
		color: {
			indigo: "bg-indigo-500",
			pink: "bg-pink-700",
		},
	},
});

const chatBallonPosition = cva("w-full flex my-1", {
	variants: {
		position: {
			left: "justify-start",
			right: "justify-end",
		},
	},
});

type ChatBallonProps = {
	isOwnChat: boolean;
	message: string;
};

export const ChatBallon: React.FC<ChatBallonProps> = ({ isOwnChat, message }) => {
	const color = isOwnChat ? "pink" : "indigo";
	const position = isOwnChat ? "right" : "left";

	return (
		<div className={chatBallonPosition({ position })}>
			<div className={chatBallonVariants({ color })}>{message}</div>
		</div>
	);
};
