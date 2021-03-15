const { Model, DataTypes } = require("sequelize");

class Worker extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        cpf: DataTypes.STRING,
        phone: DataTypes.STRING,
      },
      {
        sequelize,
        tableName: "workers",
      }
    );
  }

  //Relacionamentos
  static associate(models) {
    this.belongsTo(models.Occupation, {
      foreignKey: "occupationId",
      as: "occupation",
    });

    this.hasOne(models.Login, {
      foreignKey: "workerId",
      as: "login",
    });

    this.hasMany(models.Clockin, {
      foreignKey: "workerId",
      as: "clockins",
    });
  }
}

module.exports = Worker;
