module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      database: 'backend-boilerplate-db'
    },
    pool: {
      min: 2,
      max: 10
    }
  },
  test: {
    client: 'postgresql',
    connection: {
      database: 'backend-boilerplate-test'
    },
    pool: {
      min: 2,
      max: 10
    }
  }
};
