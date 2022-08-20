const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('member_image', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    member_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    file: {
      type: DataTypes.BLOB,
      allowNull: false
    },
    create_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    modify_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    modify_time: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'member_image',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "member_image_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
