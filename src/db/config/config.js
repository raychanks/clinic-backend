const config = require('config');

const database = config.get('database');

module.exports = {
  development: {
    username: database.username,
    password: database.password,
    database: database.database,
    host: database.host,
    dialect: database.dialect,
    logging: database.loggin,
  },
};
