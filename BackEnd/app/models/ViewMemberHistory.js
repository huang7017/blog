const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('v_member_history', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    salt: {
      type: DataTypes.STRING(32),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'v_member_history',
    schema: 'public',
    timestamps: false
  });
};
