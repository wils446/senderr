import type { Knex } from "knex";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

// Update with your config settings.
const config: Knex.Config = {
	client: "pg",
	connection: process.env.DATABASE_URL as string,
	migrations: {
		extension: "ts",
		directory: "./src/database/migrations",
	},
	seeds: {
		extension: "ts",
		directory: "./src/database/seeds",
	},
};

module.exports = config;
