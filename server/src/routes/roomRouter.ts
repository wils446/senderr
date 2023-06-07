import { roomsController } from "@src/controllers";
import { Router } from "express";
import passport from "passport";

const routes = Router();
const path = "/rooms";

routes.get("/:id", passport.authenticate("jwt", { session: false }), roomsController.getRoomById);
routes.post("/", passport.authenticate("jwt", { session: false }), roomsController.createRoom);
routes.put(
	"/group/:id",
	passport.authenticate("jwt", { session: false }),
	roomsController.updateRoom
);
routes.delete("/:id", passport.authenticate("jwt", { session: false }), roomsController.deleteRoom);
routes.post(
	"/group/:id",
	passport.authenticate("jwt", { session: false }),
	roomsController.joinGroup
);
routes.delete(
	"/group/:id",
	passport.authenticate("jwt", { session: false }),
	roomsController.leaveGroup
);

export default { routes, path };
