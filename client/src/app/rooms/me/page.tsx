"use client";

import { Brand } from "@/components";
import { UserContext } from "@/providers";
import { useContext } from "react";

export default function Page() {
	const user = useContext(UserContext);

	return (
		<div className="w-full h-full flex items-center justify-center opacity-80 flex-col">
			<Brand size={"medium"} />
			<p>Start message with your friends!</p>
		</div>
	);
}
