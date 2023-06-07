import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex("users").del();

	// Inserts seed entries
	await knex("users").insert([
		{
			username: "wilson",
			description: "an ordinary human",
			email: "wilson@gmail.com",
			password: "$2b$10$9.U9GzOtwU.3PqikXxbHkOYdfkDLTaIrVs5gOj79eGh.yqWKiNFg2",
		},
		{
			username: "vannes",
			description: "i like loli",
			email: "vannes@gmail.com",
			password: "$2b$10$9.U9GzOtwU.3PqikXxbHkOYdfkDLTaIrVs5gOj79eGh.yqWKiNFg2",
		},
	]);
}
