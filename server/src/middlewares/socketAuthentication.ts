import { SocketAuthenticationMiddleware } from "@src/@types";
import { UnauthorizedError } from "@errors";
import { Users } from "@models";
import jwt from "jsonwebtoken";

export const socketAuthentication: SocketAuthenticationMiddleware = (socket, next) => {
	if (!socket.handshake.query.token) throw new UnauthorizedError();

	const token = socket.handshake.query.token as string;
	const secret = process.env.JWT_PRIVATE_KEY as string;
	jwt.verify(token, secret, (err, payload) => {
		if (err) next(err);
		if (!payload) next(new UnauthorizedError());

		const userId = (payload! as jwt.JwtPayload).id as string;

		Users.query()
			.findById(userId)
			.then((user) => {
				socket.data.user = user;
			})
			.catch((err) => {
				next(err);
			})
			.then(() => next());
	});
};
