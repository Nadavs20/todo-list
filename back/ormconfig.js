const { SnakeNamingStrategy } = require('typeorm-naming-strategies');

module.exports = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "pgsql10",
  database: "postgres",
  schema: "todo_list",
  logging: true,
  entities: ["src/Models/*.ts"],
  namingStrategy: new SnakeNamingStrategy(),
};
