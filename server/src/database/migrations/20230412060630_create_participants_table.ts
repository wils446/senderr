import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable("participants", (table) => {
		table
			.uuid("id", { useBinaryUuid: true })
			.primary()
			.defaultTo(knex.raw("uuid_generate_v4()"));
		table.uuid("userId");
		table.foreign("userId").references("id").inTable("users");
		table.uuid("roomId");
		table.foreign("roomId").references("id").inTable("rooms").onDelete("CASCADE");
		table.string("role").notNullable();
		table.timestamp("createdAt").defaultTo(knex.fn.now());
		table.timestamp("updatedAt").defaultTo(knex.fn.now());
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable("participants");
}
