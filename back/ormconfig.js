const { SnakeNamingStrategy } = require("typeorm-naming-strategies");

module.exports = {
  type: process.env.TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  schema: process.env.DB_SCHEME,
  logging: true,
  entities: ["src/entities/*.ts"],
  namingStrategy: new SnakeNamingStrategy(),
};
