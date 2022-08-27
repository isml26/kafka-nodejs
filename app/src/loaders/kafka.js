const { Kafka } = require("kafkajs");
const { KAFKA_CONFIG } = require("../utils/config");
const { client } = require("../loaders/database");

function initializeKafka() {
  global.kafka = new Kafka({
    clientId: KAFKA_CONFIG.clientId,
    brokers: [KAFKA_CONFIG.broker],
  });
  console.log("Initialized Kafka");
}

async function connectKafkaProducer() {
  try {
    global.producer = global.kafka.producer();
    await global.producer.connect();
    console.log("Connected to kafka producer...");
  } catch (error) {
    console.log(error);
  }
}

async function connectKafkaConsumer() {
  try {
    //consumer group
    global.consumer = global.kafka.consumer({
      groupId: KAFKA_CONFIG.groupId,
    });
    console.log("Connecting to kafka consumer...");
    await global.consumer.connect();
    console.log("Connected to kafka consumer...");

    // // Consumer subscribe
    await global.consumer.subscribe({
      topic: KAFKA_CONFIG.topic,
      fromBeginning: true,
    });

    await global.consumer.run({
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
  initializeKafka,
  connectKafkaProducer,
  connectKafkaConsumer,
};
