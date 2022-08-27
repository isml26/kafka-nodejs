const app = require("./src/loaders/app");
const { connectDb } = require("./src/loaders/database");
const {
  initializeKafka,
  connectKafkaConsumer,
  connectKafkaProducer,
} = require("./src/loaders/kafka");

// promise for db
// search prototype
// npm i eslint

// node -r ./tracing.js index.js

const PORT = process.env.PORT || 8080;

async function startServer() {
  initializeKafka();

  await connectDb();

  connectKafkaProducer();

  // setTimeout(() => {
  //   createTopic();
  // }, 3000);

  setTimeout(() => {
    connectKafkaConsumer();
  }, 3000);

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}

startServer();
