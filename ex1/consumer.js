const { Kafka } = require("kafkajs");


const topic_name = process.argv[2] || "Logs2";


createConsumer(topic_name);

async function createConsumer() {
  try {
    // connect to kafka
    const kafka = new Kafka({
      clientId: "kafka_ex1",
      brokers: ["localhost:9092"],
    });
    const consumer = kafka.consumer({
      groupId: "ex1_cg1",
    });
    console.log("Connecting to kafka consumer...");
    await consumer.connect();
    console.log("Connected to kafka consumer...");

    // Consumer subscribe
    await consumer.subscribe({
      topic: topic_name,
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async (res) => {
        console.log(
          `Received message: ${res.message.value} , Partition => ${res.partition} `
        );
      },
    });
  } catch (error) {
    console.log("consumer.js/Something went wrong: ", error);
  }
}
