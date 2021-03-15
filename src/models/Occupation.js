const { Model, DataTypes } = require("sequelize");

class Occupation extends Model {
  static init(sequelize) {
    super.init(
      {
        name: DataTypes.STRING,
        shiftStart: DataTypes.TIME,
        shiftEnd: DataTypes.TIME,
        breakStart: DataTypes.TIME,
        breakEnd: DataTypes.TIME,
      },
      {
        sequelize,
        tableName: "occupations",
      }
    );
  }

  //Relacionamentos
  static associate(models) {
    this.hasMany(models.Worker, { foreignKey: "occupationId", as: "worker" });
  }
}

module.exports = Occupation;
