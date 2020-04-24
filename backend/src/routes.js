const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");

const CompanyController = require("./controllers/CompanyController");
const VagasController = require("./controllers/VagasController");
const ProfileController = require("./controllers/ProfileController");
const SessionController = require("./controllers/SessionController");

const routes = express.Router();

routes.post(
  "/sessions",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  SessionController.store
);

routes.get("/company", CompanyController.index);

routes.post(
  "/company",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      whatsapp: Joi.number().required().min(10).max(11),
      city: Joi.string().required(),
      uf: Joi.string().required().length(2),
    }),
  }),
  CompanyController.store
);

routes.get(
  "/profile",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  ProfileController.index
);

routes.get(
  "/vagas",
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number(),
    }),
  }),
  VagasController.index
);
routes.post(
  "/vagas",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),

    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      qualification: Joi.string().required(),
      formation: Joi.string().required(),
      workplace: Joi.string().required(),
      value: Joi.number().required(),
    }),
  }),
  VagasController.store
);

routes.delete(
  "/vagas/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    }),
  }),
  VagasController.delete
);

module.exports = routes;
