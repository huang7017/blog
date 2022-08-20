
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('email_code', {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    code: {
      type: DataTypes.STRING(6),
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
    tableName: 'email_code',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "email_code_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
