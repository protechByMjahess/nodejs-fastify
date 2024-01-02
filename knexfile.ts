export default {
  development: {
    client: "postgresql",
    connection: {
      database: "moune",
      user: "postgres",
      password: "root",
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      connectionString:
        "postgres://admin:YsP1arj1uh4coooiPG5MLKwJiQTHDYDP@dpg-cl7rriv6e7vc73a0902g-a/handmade_treasures",
      database: "handmade_treasures",
      user: "admin",
      password: "YsP1arj1uh4coooiPG5MLKwJiQTHDYDP",
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
