
exports.up = function(knex) {
    return knex.schema.createTable('users',function(table){
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('phone');
        table.string('email').notNullable().unique();
        table.string('password').notNullable();
        table.string('image').notNullable();
        table.string('token').notNullable();
        table.integer('status').notNullable();
        table.integer('type').notNullable();
        table.string('passwordResetToken').notNullable();        
        table.datetime('passwordResetExpires').notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at");
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
