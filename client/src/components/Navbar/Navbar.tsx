import { RoomContext, UserContext } from "@/providers";
import { useContext } from "react";
import { Brand } from "../Brand";
import { VariantProps, cva } from "class-variance-authority";

const NavbarVariants = cva("", {
	variants: {
		type: {
			app: "w-screen text-white flex items-center justify-between bg-gray-900 py-3 px-3 sticky top-0",
			chatRoom: "w-full text-white basis-1/12 py-2 flex items-center justify-between px-4 bg-gray-800",
		},
	},
	defaultVariants: {
		type: "app",
	},
});

type NavbarVariantsType = VariantProps<typeof NavbarVariants>;
type NavbarProps = Required<Pick<NavbarVariantsType, "type">> & {
	roomName?: string;
};

export const Navbar: React.FC<NavbarProps> = ({ type }) => {
	let roomName: string = "";
	const { username } = useContext(UserContext);
	if (type !== "app") {
		const room = useContext(RoomContext);
		roomName = room.name;
	}

	return (
		<div className={NavbarVariants({ type })}>
			{type == "app" ? (
				<>
					<Brand size={"small"} />
					<h3 className="text-xl mx-2">{username}</h3>
				</>
			) : (
				<>
					<h4 className="text-xl">{roomName}</h4>
				</>
			)}
		</div>
	);
};
