"use client";

import { Brand, LoginForm } from "@/components";
import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function Login() {
	const router = useRouter();

	return (
		<div className={`${inter.className} w-full h-4/5 flex justify-center items-center`}>
			<div className="py-10 px-14 bg-gray-50 bg-opacity-25 flex flex-col rounded-lg items-center space-y-5 drop-shadow-2xl">
				<Brand size="medium" />
				<LoginForm />
				<a
					className="text-sm mx-auto text-center text-blue-400 hover:underline hover:cursor-pointer"
					onClick={() => router.replace("/register")}
				>
					sign up
				</a>
			</div>
		</div>
	);
}
