const { Model, DataTypes } = require("sequelize");

class Login extends Model {
  static init(sequelize) {
    super.init(
      {
        password: DataTypes.STRING(32),
        isAdmin: DataTypes.BOOLEAN,
      },
      {
        sequelize,
        tableName: "logins",
      }
    );
  }

  //Relacionamentos
  static associate(models) {
    this.belongsTo(models.Worker, {
      foreignKey: "workerId",
      as: "worker",
    });
  }
}

module.exports = Login;
