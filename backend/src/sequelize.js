const Sequelize = require('sequelize');

var sequelize = new Sequelize('graphql_db', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, // True caso voce deseje ver as querys no console
  pool: {
      max: 5,
      min: 0,
      idle: 10000
  },

});

module.exports = sequelize;