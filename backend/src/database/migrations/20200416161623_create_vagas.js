exports.up = function (knex) {
  return knex.schema.createTable("vagas", function (table) {
    table.increments();

    table.string("title").notNullable();
    table.string("description").notNullable();
    table.string("qualification").notNullable();
    table.string("formation").notNullable();
    table.string("workplace").notNullable();
    table.decimal("value").notNullable();

    table.string("company_id").notNullable();

    table.foreign("company_id").references("id").inTable("company");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("vagas");
};
