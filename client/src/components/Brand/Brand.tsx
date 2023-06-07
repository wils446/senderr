import { VariantProps, cva } from "class-variance-authority";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const brandVariants = cva("text-gray-100 font-bold drop-shadow-md italic", {
	variants: {
		size: {
			big: "text-8xl",
			medium: "text-6xl",
			small: "text-4xl",
		},
	},
});

type BrandProps = VariantProps<typeof brandVariants>;

export const Brand: React.FC<BrandProps> = ({ size }) => {
	return <h1 className={`${inter.className} ${brandVariants({ size })}`}>senderr</h1>;
};
