
exports.up = function(knex) {
    return knex.schema.createTable('cq_usuario', function (table) {
        table.increments('id').primary();
        table.string('login', 15);
        table.string('senha',15);
        table.string('nome_completo', 60);
        table.string('empresa',15);
        table.string('cluster',15);
        table.string('telefone',15);
        table.timestamps();
    });
};

exports.down = function(knex) {
    return knex.schema.droTable('cq_usuario');
  };
