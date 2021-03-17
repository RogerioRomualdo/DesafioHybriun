const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

//Import dos models
const Worker = require("../models/Worker");
const Occupation = require("../models/Occupation");
const Login = require("../models/Login");
const Clockin = require("../models/Clockin");

const connection = new Sequelize(dbConfig);

//Inicializações
Worker.init(connection);
Occupation.init(connection);
Login.init(connection);
Clockin.init(connection);

//Relacionamentos
Worker.associate(connection.models);
Occupation.associate(connection.models);
Login.associate(connection.models);
Clockin.associate(connection.models);

module.exports = connection;
