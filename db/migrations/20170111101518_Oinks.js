
exports.up = function(knex, Promise) {
  return knex.schema.createTable('Oinks', function(table){
    table.increments();
    table.uuid('id').notNullable().unique();
    table.string('text').notNullable();
    table.string('asset').notNullable();
    table.string('user').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('Oinks');
};
