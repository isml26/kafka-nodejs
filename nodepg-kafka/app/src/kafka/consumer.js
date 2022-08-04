const { Kafka } = require("kafkajs");
// const pool = require("../db");
const { KAFKA_CONFIG } = require("../utils/config");

// const topic_name = process.argv[2] || "Logs2";

async function createConsumer() {
  try {
    // connect to kafka
    const kafka = new Kafka({
      clientId: KAFKA_CONFIG.clientId,
      brokers: [KAFKA_CONFIG.broker],
    });
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

        //console.log(res.message.key.toString())

        if (res.message.key.toString() !== "1") {
          pool
            .query(
              "INSERT INTO person (person_id,message) VALUES($1,$2) RETURNING *",
              [res.message.key, res.message.value]
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
