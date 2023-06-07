import { ApiContext } from "@/providers";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
	email: string;
	password: string;
};

export const LoginForm: React.FC = () => {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();
	const { auth, tokenManager } = useContext(ApiContext);
	const submitHandler: SubmitHandler<Inputs> = ({ email, password }) => {
		auth
			.login(email, password)
			.then((data) => tokenManager.setJwtToken(data.jwt))
			.then(() => router.push("/rooms/me"));
	};

	return (
		<form onSubmit={handleSubmit(submitHandler)}>
			<div className="flex flex-col">
				<label className="" htmlFor="">
					Email
				</label>
				<input
					type="text"
					className="outline-none px-1 text-black rounded text-base mb-1"
					{...register("email", { required: true })}
				/>
				{errors.email && <span className="text-red-500 text-sm">*This field is required.</span>}
				<label className="mt-1" htmlFor="">
					Password
				</label>
				<input
					type="password"
					className="outline-none px-1 text-black rounded text-base"
					{...register("password", { required: true })}
				/>
				{errors.password && <span className="text-red-500 text-sm">*This field is required.</span>}
				<input
					className="bg-indigo-900 rounded-md py-1 hover:bg-opacity-80 hover:cursor-pointer mt-5 "
					type="submit"
					value="Sign In"
				/>
			</div>
		</form>
	);
};
