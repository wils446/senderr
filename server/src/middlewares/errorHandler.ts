import { NotFoundError } from "@errors";
import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
	if (!err) {
		err = new NotFoundError();
	}

	switch (err.name) {
		case "BadRequest":
			return res.status(400).json({ message: err.message });
		case "ConflictError":
			return res.status(409).json({ message: err.message });
		case "NotFoundError":
			return res.status(404).json({ message: err.message });
		case "UnauthorizedError":
			return res.status(401).json({ message: err.message });
		case "ValidationError":
			return res.status(422).json({ message: err.message });
		default:
			return res.status(500).json({ message: err.message });
	}
};
