const { Kafka } = require("kafkajs");
const {KAFKA_CONFIG} = require("../utils/config")

async function createTopic() {
  try {
    // connect to kafka
    const kafka = new Kafka({
      clientId: KAFKA_CONFIG.clientId,
      brokers: [KAFKA_CONFIG.broker],
    });
    const admin = kafka.admin();
    console.log("Connecting to kafka broker...");
    await admin.connect();
    console.log("Connected to kafka broker...");
    await admin.createTopics({
      waitForLeaders: true,
      topics: [
        {
          topic: KAFKA_CONFIG.topic,
          numPartitions: 5,
        },
      ],
    });
    console.log("Topics created successfully");
    await admin.disconnect();
  } catch (error) {
    console.log("topic.js/Something went wrong: ", error);
  }
}

module.exports = {
  createTopic,
};