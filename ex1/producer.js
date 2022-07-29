const { Kafka } = require("kafkajs");

const topic_name = process.argv[2] || "Logs2";
const partition = process.argv[3] || 0;

createProducer();

async function createProducer() {
  try {
    // connect to kafka
    const kafka = new Kafka({
      clientId: "kafka_ex1",
      brokers: ["localhost:9092"],
    });
    const producer = kafka.producer();
    console.log("Connecting to kafka producer...");
    await producer.connect();
    console.log("Connected to kafka producer...");

    const res = await producer.send({
      topic: topic_name,
      messages: [
        {
          value: "This is a test log message...",
          partition: partition,
        },
      ],
    });

    console.log("Data has been sent successfully", JSON.stringify(res));
    await producer.disconnect();
  } catch (error) {
    console.log("producer.js/Something went wrong: ", error);
  } finally {
    process.exit(0);
  }
}
