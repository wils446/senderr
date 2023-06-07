import { usersController } from "@controllers";
import { Router } from "express";
import passport from "passport";

const routes = Router();
const path = "/users";

routes.get("/", passport.authenticate("jwt", { session: false }), usersController.getUser);
routes.get("/:id", passport.authenticate("jwt", { session: false }), usersController.getUserById);

export default { routes, path };
