// "use strict";

// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     await queryInterface.createTable("logins", {
//       id: {
//         type: Sequelize.INTEGER,
//         alloNull: false,
//         primaryKey: true,
//         autoIncrement: true,
//       },
//       workerId: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         references: { model: "workers", key: "id" },
//         onUpdate: "CASCADE",
//         onDelete: "CASCADE",
//       },
//       password: {
//         type: Sequelize.STRING(32),
//         allowNull: false,
//       },
//       isAdmin: {
//         type: Sequelize.BOOLEAN,
//         allowNull: false,
//       },
//     });
//   },

//   down: async (queryInterface, Sequelize) => {
//     await queryInterface.dropTable("logins");
//   },
// };
