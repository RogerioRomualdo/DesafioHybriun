"use strict";

const { sequelize } = require("../../models/worker");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("clockins", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      workerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "workers", key: "id" },
      },
      checkIn: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      checkOut: {
        type: Sequelize.TIME,
        allowNull: true,
      },
      breakStart: {
        type: Sequelize.TIME,
        allowNull: true,
      },
      breakEnd: {
        type: Sequelize.TIME,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("clockins");
  },
};
