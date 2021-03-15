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
  }
}

module.exports = Worker;
