import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex("rooms").del();

	// Inserts seed entries
	await knex("rooms").insert([{ name: "personal", type: "personal" }]);
}
