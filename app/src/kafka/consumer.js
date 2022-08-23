const { Kafka } = require("kafkajs");
const { client } = require("../loaders/database");
const { KAFKA_CONFIG } = require("../utils/config");

// const topic_name = process.argv[2] || "Logs2";

async function createConsumer() {
  try {
    // connect to kafka
    const kafka = new Kafka({
      clientId: KAFKA_CONFIG.clientId,
      brokers: [KAFKA_CONFIG.broker],
    });
    //consumer group
    const consumer = kafka.consumer({
      groupId: KAFKA_CONFIG.groupId,
    });
    console.log("Connecting to kafka consumer...");
    await consumer.connect();
    console.log("Connected to kafka consumer...");

    // Consumer subscribe
    await consumer.subscribe({
      topic: KAFKA_CONFIG.topic,
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async (res) => {
        console.log(
          `Received message: ${res.message.value}, key:${res.message.key} , Partition => ${res.partition} `
        );

        if (res.message.key.toString() !== "1") {
          client
            .query(
              "INSERT INTO person_message (person_id,message) VALUES($1,$2) RETURNING *",
              [res.message.key.toString(), res.message.value.toString()]
            )
            .then(() => {
              console.log("insreted to database");
            })
            .catch((err) => {
              console.log(err);
            });
        }
      },
    });
  } catch (error) {
    console.log("consumer.js/Something went wrong: ", error);
  }
}

module.exports = {
  createConsumer,
};