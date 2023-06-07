import { cva, type VariantProps } from "class-variance-authority";
import { Inter } from "next/font/google";
import { ButtonHTMLAttributes } from "react";

const inter = Inter({ subsets: ["latin"] });

const buttonVariants = cva("duration-100 hover:bg-opacity-80 disabled:bg-opacity-80", {
	variants: {
		size: {
			default: "rounded-xl w-40 h-12 text-lg hover:text-sm",
			small: "w-24 h-8 rounded-sm",
		},
		color: {
			blue: "bg-blue-700",
			indigo: "bg-indigo-700",
			green: "bg-green-700",
		},
	},
	defaultVariants: {
		size: "default",
	},
});

type ButtonVariantsType = VariantProps<typeof buttonVariants>;
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
	Omit<ButtonVariantsType, "color"> &
	Required<Pick<ButtonVariantsType, "color">>;

export const Button: React.FC<ButtonProps> = ({ size, color, children, ...props }) => {
	return (
		<button className={`${inter.className} ${buttonVariants({ color, size })}`} {...props}>
			{children}
		</button>
	);
};
