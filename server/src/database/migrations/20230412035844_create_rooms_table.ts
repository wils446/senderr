import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable("rooms", (table) => {
		table
			.uuid("id", { useBinaryUuid: true })
			.primary()
			.defaultTo(knex.raw("uuid_generate_v4()"));
		table.string("name").notNullable();
		table.string("type").notNullable();
		table.timestamp("createdAt").defaultTo(knex.fn.now());
		table.timestamp("updatedAt").defaultTo(knex.fn.now());
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable("rooms");
}
