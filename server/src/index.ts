import dotenv from "dotenv";
import http from "http";
import "module-alias/register";
import { Server } from "socket.io";

async function main() {
	await dotenv.config({ path: ".env" });

	await import("@database/database");

	const app = await (await import("@express")).app;
	const server = http.createServer(app);
	const io = new Server(server, { cors: { origin: "http://localhost:3000" } });

	const { socketInit } = await import("@socket");
	await socketInit(io);

	const PORT = process.env.PORT as string;

	server.listen(PORT, () => {
		console.log(`Listening to http://localhost:${PORT}`);
	});
}

main();
