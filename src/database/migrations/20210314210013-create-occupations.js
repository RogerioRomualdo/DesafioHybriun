"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("occupations", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(32),
        allowNull: false,
      },
      shiftStart: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      shiftend: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      breakStart: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      breakEnd: {
        type: Sequelize.TIME,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("occupations");
  },
};
