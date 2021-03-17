const express = require("express");

//Imports
const workerController = require("./controllers/workerController");
const occupationController = require("./controllers/occupationController");
const clockinController = require("./controllers/clockinController");
const loginController = require("./controllers/loginController");
const auth = require("./middlewares/auth");

const routes = express.Router();
routes.use(auth);

//Rotas
routes.get("/workers", workerController.index);
routes.post("/workers", workerController.store);
routes.put("/:id/workers", workerController.update);

routes.get("/occupations", occupationController.index);
routes.post("/occupations", occupationController.store);

routes.get("/:id/clockins", clockinController.index);
routes.post("/:id/clockins", clockinController.store);
routes.put("/:workerId/clockins", clockinController.update);

routes.post("/auth", loginController.auth);

routes.get("/", (req, res) => {
  res.send({ ok: true });
});

module.exports = routes;
