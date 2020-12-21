
exports.up = function(knex) {
    return knex.schema.createTable('projects',function(table){
        table.increments('id').primary;
        table.string('name').notNullable();
        table.string('xml').notNullable();
        table.integer('user_id',11).notNullable().unsigned().references('id').inTable('users');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('projects');
};
