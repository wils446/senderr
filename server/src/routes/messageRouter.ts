import { Router } from "express";
import { messageController } from "@controllers";
import passport from "passport";

const routes = Router();
const path = "/message";

routes.get(
	"/last",
	passport.authenticate("jwt", { session: false }),
	messageController.getLastMessageFromAllRooms
);

routes.get(
	"/:roomId",
	passport.authenticate("jwt", { session: false }),
	messageController.isUserInRoom,
	messageController.getMessageByRoom
);

routes.post(
	"/:roomId",
	passport.authenticate("jwt", { session: false }),
	messageController.isUserInRoom,
	messageController.postMessage
);

export default { routes, path };
