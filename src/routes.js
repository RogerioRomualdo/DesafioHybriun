const express = require("express");

const workerController = require("./controllers/workerController");
const occupationController = require("./controllers/occupationController");

const routes = express.Router();

routes.get("/workers", workerController.index);
routes.post("/workers", workerController.store);

routes.get("/occupations", occupationController.index);
routes.post("/occupations", occupationController.store);

module.exports = routes;
