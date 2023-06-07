import { authController } from "@controllers";
import { Router } from "express";

const routes = Router();
const path = "/auth";

routes.post("/register", authController.register);
routes.post("/login", authController.login);

export default { routes, path };
