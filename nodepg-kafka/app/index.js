const app = require("./src/loaders/app");
const { connectDb } = require("./src/loaders/database");
const { createConsumer } = require("./src/kafka/consumer");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
const {
  initializeKafka,
  connectKafkaConsumer,
  connectKafkaProducer,
} = require("./src/loaders/kafka");

// node -r ./tracing.js index.js

const PORT = process.env.PORT || 8080;

async function startServer() {

  initializeKafka();
  
  connectDb();
  
  connectKafkaProducer();

  // setTimeout(() => {
  //   createTopic();
  // }, 3000);


  setTimeout(() => {
    createConsumer();
  }, 3000);

  
// const options = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Kafka API",
//       version: "1.0.0",
//       desription: "Simple api",
//     },
//     servers: [
//       {
//         url: "http://localhost:8080",
//       },
//     ],
//   },
//   apis: ["../routes/*js"],
// };

// const specs = swaggerJsDoc(options);

// app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}

startServer();