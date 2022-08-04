const app = require("./src/loaders/app");
const { connectDb } = require("./src/loaders/database");
const { createConsumer } = require("./src/kafka/consumer");
const { createTopic } = require("./src/kafka/topic");

const PORT = process.env.PORT || 8080;

async function startServer() {
  setTimeout(() => {
    createTopic();
  }, 3000);

  setTimeout(() => {
    createConsumer();
  }, 6000);

  connectDb();

  app.listen(PORT, () => {
    console.log(`Listeningggg on port ${PORT}`);
  });
}

startServer();