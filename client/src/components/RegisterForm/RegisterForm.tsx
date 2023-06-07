import { useForm, SubmitHandler } from "react-hook-form";
import { useContext } from "react";
import { ApiContext } from "@/providers";

type Inputs = {
	username: string;
	email: string;
	password: string;
};

export const RegisterForm: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>();
	const { auth } = useContext(ApiContext);
	const submitHandler: SubmitHandler<Inputs> = ({ email, password, username }) =>
		auth.register(username, email, password);

	return (
		<form onSubmit={handleSubmit(submitHandler)}>
			<div className="flex flex-col">
				<label htmlFor="">Username</label>
				<input
					type="text"
					className="outline-none px-1 text-black rounded text-base mb-1"
					{...register("username", { required: true })}
				/>
				{errors.username && <span className="text-red-500 text-sm">*This field is required</span>}
				<label className="mt-1" htmlFor="">
					Email
				</label>
				<input
					type="text"
					className="outline-none px-1 text-black rounded text-base mb-1"
					{...register("email", { required: true })}
				/>
				{errors.email && <span className="text-red-500 text-sm">*This field is required</span>}
				<label htmlFor="" className="mt-1">
					Password
				</label>
				<input
					type="password"
					className="outline-none px-1 text-black rounded text-base mb-1"
					{...register("password", { required: true })}
				/>
				{errors.password && <span className="text-red-500 text-sm">*This field is required</span>}
				<input
					className="bg-indigo-900 rounded-md py-1 hover:bg-opacity-80 hover:cursor-pointer mt-5 "
					type="submit"
					value="Sign Up"
				/>
			</div>
		</form>
	);
};
