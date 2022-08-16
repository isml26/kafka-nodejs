const { Kafka } = require("kafkajs");
const { KAFKA_CONFIG, KAFKA } = require("../utils/config");

// connect to kafka

function initializeKafka() {
  KAFKA.kafka = new Kafka({
    clientId: KAFKA_CONFIG.clientId,
    brokers: [KAFKA_CONFIG.broker],
  });
  console.log("Initialized Kafka");
}

async function connectKafkaProducer() {
  try {
    KAFKA.producer = KAFKA.kafka.producer();
    await KAFKA.producer.connect();
    console.log("Connected to kafka producer...");
  } catch (error) {
    console.log(error);
  }
}

async function connectKafkaConsumer() {
  try {
    //consumer group
    KAFKA.consumer = KAFKA.kafka.consumer({
      groupId: KAFKA_CONFIG.groupId,
    });
    console.log("Connecting to kafka consumer...");
    await consumer.connect();
    console.log("Connected to kafka consumer...");

    // Consumer subscribe
    await KAFKA.consumer.subscribe({
      topic: KAFKA_CONFIG.topic,
      fromBeginning: true,
    });

    await KAFKA.consumer.run({
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
