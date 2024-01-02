import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("Advice", (table) => {
    table.uuid("id").unique().primary();
    table.string("advice").unique();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("Advice");
}
