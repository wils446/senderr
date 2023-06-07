import { config } from "./config";
import { Model } from "objection";
import knex from "knex";

const db = knex({
	client: "pg",
	connection: config.DATABASE_URL,
	searchPath: ["knex", "public"],
});

Model.knex(db);

export default db;
