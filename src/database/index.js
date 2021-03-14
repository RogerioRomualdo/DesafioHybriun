const Sequelize = require("sequelize");
const dbConfig = require("../config/database.js");

//Import dos models

const connection = new Sequelize(dbConfig); 

//Relacionamentos

module.exports = connection;
