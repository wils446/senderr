import { test } from "@controllers";
import { Router } from "express";

const routes = Router();
const path = "/test";

routes.get("/", test);

export default { routes, path };
