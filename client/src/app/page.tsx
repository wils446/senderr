"use client";

import { Brand } from "@/components";
import { useRouter } from "next/navigation";
import { Inter } from "next/font/google";
import { Button } from "@/components/Button/Button";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	const router = useRouter();

	return (
		<main className="w-full h-4/5 flex justify-center items-center">
			<div className="flex flex-col space-y-10">
				<Brand size="big" />
				<div className="flex w-full justify-between">
					<Button color="blue" onClick={() => router.push("/login")}>
						Sign In
					</Button>
					<Button color="blue" onClick={() => router.push("/register")}>
						Sign Up
					</Button>
				</div>
			</div>
		</main>
	);
}
