import { SuperRequestHandler } from "@src/@types";

export const test: SuperRequestHandler = async (req, res, next) => {
	try {
		res.status(200).json({ message: "success" });
	} catch (err) {
		next(err);
	}
};
