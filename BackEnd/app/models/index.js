const dbConfig = require("../config/db.config.js");
const DataTypes = require("sequelize");
const sequelize = new DataTypes(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  timezone:"+8:00",
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
const db = {};
db.DataTypes = DataTypes;
db.sequelize = sequelize;
db.member = require("./member.js")(sequelize, DataTypes);
db.memberHistory = require("./member_history.js")(sequelize, DataTypes);
module.exports = db;