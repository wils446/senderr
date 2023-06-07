import { RefObject } from "react";

export const scrollToBottom = (ref: RefObject<HTMLDivElement>) => {
	if (!ref || !ref.current) return;
	ref.current.scrollTop = ref.current.scrollHeight;
};
