
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('member_history', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    memberid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    salt: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    isenable: {
      type: DataTypes.BOOLEAN,
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
    },
    errorcount: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'member_history',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "member_history_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
