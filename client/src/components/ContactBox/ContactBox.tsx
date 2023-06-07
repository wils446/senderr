import { HTMLAttributes } from "react";

type ContactBoxProps = {
	username: string;
	date: Date;
} & HTMLAttributes<HTMLDivElement>;

export const ContactBox: React.FC<ContactBoxProps> = ({ username, date, ...props }) => {
	return (
		<div className="w-full h-20 border-b-2 border-blue-950 p-1" {...props}>
			<div className="h-full w-full rounded-xl p-1 px-2 flex flex-col justify-between hover:bg-blue-900 hover:bg-opacity-20 hover:cursor-pointer">
				<h5 className="">{username}</h5>
				<div className="flex justify-end">
					<h5 className="text-xs">{date.toLocaleTimeString()}</h5>
				</div>
			</div>
		</div>
	);
};
