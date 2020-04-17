const express = require("express");
const CompanyController = require("./controllers/CompanyController");
const VagasController = require("./controllers/VagasController");
const ProfileController = require("./controllers/ProfileController");
const SessionController = require("./controllers/SessionController");

const routes = express.Router();

routes.post("/sessions", SessionController.store);

routes.get("/company", CompanyController.index);
routes.post("/company", CompanyController.store);

routes.get("/profile", ProfileController.index);

routes.get("/vagas", VagasController.index);
routes.post("/vagas", VagasController.store);
routes.delete("/vagas/:id", VagasController.delete);

module.exports = routes;
