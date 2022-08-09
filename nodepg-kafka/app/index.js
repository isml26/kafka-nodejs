const app = require("./src/loaders/app");
const { singleton } = require("./src/loaders/database");
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

  singleton.getDbConn();

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}

startServer();
