require('dotenv/config');


module.exports = {
  

  development: {
    client: 'mysql',
    connection: {
      debug: true,
      host : process.env.DB_HOST,
      port: process.env.DB_PORT,
      user : process.env.DB_USER,
      password : process.env.DB_PASS,
      database : process.env.DB_NAME
    },
    migrations: {
      directory: './scr/database/migrations'
    }
  },

  staging: {
    client: 'mysql',
    connection: {
      debug: true,
      host : process.env.DB_HOST,
      port: process.env.DB_PORT,
      user : process.env.DB_USER,
      password : process.env.DB_PASS,
      database : process.env.DB_NAME
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'mysql',
    connection: {
      debug: true,
      host : process.env.DB_HOST,
      port: process.env.DB_PORT,
      user : process.env.DB_USER,
      password : process.env.DB_PASS,
      database : process.env.DB_NAME
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
