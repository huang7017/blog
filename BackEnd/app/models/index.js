const dbConfig = require("../config/DbConfig.js");
const DataTypes = require("sequelize");
const { Op } = require("sequelize");
const sequelize = new DataTypes(dbConfig.DB, dbConfig.USER, dbConfig.CODE, {
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
db.op = Op;
db.member = require("./Member.js")(sequelize, DataTypes);
db.memberHistory = require("./MemberHistory.js")(sequelize, DataTypes);
db.emailCode = require("./EmailCode")(sequelize, DataTypes);
db.memberImage = require("./MemberImage.js")(sequelize, DataTypes);
module.exports = db;