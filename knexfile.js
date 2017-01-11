
module.exports = {

  test: {
    client: 'pg',
    connection: {
      host: "localhost",
      port: "5432",
      user: "leosimmons",
      database: "oinkster-test"
    },
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds/test'
    }
  },

  dev: {
    client: 'pg',
    connection: 'postgres://localhost/oinkster-dev',
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds/dev'
    }
  },

  prod: {
    client: 'pg',
    connection: 'postgres://localhost/oinkster-dev',
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds/prod'
    }
  }

};
