"use client";

import { Brand, RegisterForm } from "@/components";
import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function Register() {
	const router = useRouter();

	return (
		<div className={`${inter.className} w-full h-4/5 flex justify-center items-center`}>
			<div className="bg-gray-50 bg-opacity-25 py-10 px-14 rounded-lg items-center flex flex-col space-y-5 drop-shadow-2xl">
				<Brand size="medium" />
				<RegisterForm />
				<a
					className="text-sm mx-auto text-center text-blue-400 hover:underline hover:cursor-pointer"
					onClick={() => router.replace("/login")}
				>
					sign in
				</a>
			</div>
		</div>
	);
}
