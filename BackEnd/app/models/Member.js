
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('member', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    createid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    createtime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    modifyid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    modifytime: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'member',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "member_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
