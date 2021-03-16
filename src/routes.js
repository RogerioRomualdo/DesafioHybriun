const express = require("express");

//Imports
const workerController = require("./controllers/workerController");
const occupationController = require("./controllers/occupationController");
const clockinController = require("./controllers/clockinController");

const routes = express.Router();

//Rotas
routes.get("/workers", workerController.index);
routes.post("/workers", workerController.store);
routes.put("/:id/workers", workerController.update);

routes.get("/occupations", occupationController.index);
routes.post("/occupations", occupationController.store);

routes.get("/:id/clockins", clockinController.index);
routes.post("/:id/clockins", clockinController.store);
routes.put("/:workerId/clockins", clockinController.update);

module.exports = routes;
