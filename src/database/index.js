const Sequelize = require("sequelize");
const dbConfig = require("../config/database.js");

//Import dos models
const Worker = require("../models/Worker");
const Occupation = require("../models/Occupation");

const connection = new Sequelize(dbConfig);

//Inicializações
Worker.init(connection);
Occupation.init(connection);

//Relacionamentos
Worker.associate(connection.models);
Occupation.associate(connection.models);

module.exports = connection;
