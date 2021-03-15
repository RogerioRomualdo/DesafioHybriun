const { Model, DataTypes } = require("sequelize");

class Clockin extends Model {
  static init(sequelize) {
    super.init(
      {
        checkIn: DataTypes.TIME,
        checkOut: DataTypes.TIME,
        breakStart: DataTypes.TIME,
        breakEnd: DataTypes.TIME,
      },
      {
        sequelize,
        tableName: "clockins",
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

module.exports = Clockin;
