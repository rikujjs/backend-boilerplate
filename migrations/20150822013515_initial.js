exports.up = function(knex, Promise) {
  return knex.schema
  .createTable('User', function (table) {
    table.bigincrements('id').primary();
    table.string('email');
    table.string('password');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('User')
};
