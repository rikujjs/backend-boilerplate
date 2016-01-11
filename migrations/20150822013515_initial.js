exports.up = (knex, Promise) => {
  return knex.schema
  .createTable('user',(table) => {
    table.bigincrements('id').primary();
    table.string('email');
    table.string('password');
  });
};

exports.down = (knex, Promise) => {
  return knex.schema
    .dropTableIfExists('user');
};
