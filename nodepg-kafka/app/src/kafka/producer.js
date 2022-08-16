const { Kafka } = require("kafkajs");
const { KAFKA_CONFIG } = require("../utils/config");

const partition = process.argv[3] || 0;

// createProducer();

async function createProducer(id, message) {
  try {
    // connect to kafka
    const kafka = new Kafka({
      clientId: KAFKA_CONFIG.clientId,
      brokers: [KAFKA_CONFIG.broker],
    });
    const producer = kafka.producer();
    console.log("Connecting to kafka producer...");
    await producer.connect();
    console.log("Connected to kafka producer...");

    const res = await producer.send({
      topic: KAFKA_CONFIG.topic,
      messages: [
        {
          value: message,
          key: id,
          partition: partition,
        },
      ],
    });

    console.log("Data has been sent successfully", JSON.stringify(res));
  } catch (error) {
    console.log("producer.js/Something went wrong: ", error);
  }
}

module.exports = {
  createProducer,
};
