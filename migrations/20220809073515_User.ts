import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("Users", (table) => {
    table.uuid("id").unique().primary();
    table.string("email").unique();
    table.string("password");
    table.string("name");
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable("Users");
}
