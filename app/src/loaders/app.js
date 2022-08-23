const express = require("express");
const cors = require("cors")
const swaggerMiddleware = require("../middlewares/swagger");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const personRoutes = require("../routes/message");
const app = express();

app.use(express.json());
app.use(cors());

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
  apis: ["./src/routes/*js"],
};

const specs = swaggerJsDoc(options);


app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

// app.use(swaggerMiddleware)

app.use("/message", personRoutes);

app.get("/", (req, res) => {
  res.send("Kafka Api");
});

// app.get("*", (req, res) => {
//   res.json({
//     error: "Cannot found given route",
//   });
// });

module.exports = app;
