const  router  = require("express").Router();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Kafka API",
      version: "1.0.0",
      desription: "Simple api",
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: ["../src/routes/*js"],
};

const specs = swaggerJsDoc(options);

module.exports = function swaggerMiddleware(req, res, next) {
  return (function () {
    next.apply();
    return router.get("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
  })(next);
};
