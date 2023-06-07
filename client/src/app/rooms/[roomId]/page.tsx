"use client";

import { ChatBoard, Navbar, TypingBox } from "@/components";
import { scrollToBottom } from "@/lib/utils";
import { useEffect, useRef } from "react";

export default function Page() {
	const chatBoardRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		scrollToBottom(chatBoardRef);
	}, []);

	return (
		<div className="w-full h-full flex flex-col">
			<div className="flex-shrink-0">
				<Navbar type={"chatRoom"} roomName={"test dulu"} />
			</div>
			<div ref={chatBoardRef} className="flex-grow overflow-y-auto h-full">
				<ChatBoard boardScrollRef={chatBoardRef} />
			</div>
			<div className="flex-shrink-0">
				<TypingBox boardScrollRef={chatBoardRef} />
			</div>
		</div>
	);
}
