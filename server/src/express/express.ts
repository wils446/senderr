import { errorHandler, passport } from "@middlewares";
import { testRoutes } from "@routes";
import bodyParser from "body-parser";
import cors from "cors";
import Express from "express";

async function expressInit() {
	const app = Express();
	app.use(bodyParser.json());
	app.use(cors());

	app.use(passport.initialize());

	const { authRoutes, userRoutes, roomRoutes, messageRoutes } = await import("@routes");

	app.use(authRoutes.path, authRoutes.routes);
	app.use(userRoutes.path, userRoutes.routes);
	app.use(roomRoutes.path, roomRoutes.routes);
	app.use(messageRoutes.path, messageRoutes.routes);
	app.use(testRoutes.path, testRoutes.routes);

	app.use(errorHandler);

	return app;
}

export default expressInit();
