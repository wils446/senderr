import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex("messages").del();

	// Inserts seed entries
	await knex("messages").insert([
		{
			userId: "c79ae6ed-d49f-453e-9eef-a348f1dc804d",
			roomId: "fd90764f-19fa-4f68-8ada-83211870f48e",
			message: "yang bener aja lu",
		},
		{
			userId: "5722c542-869b-438b-aab0-319af02f3f08",
			roomId: "fd90764f-19fa-4f68-8ada-83211870f48e",
			message: "bacod gelut kita sini",
		},
	]);
}
