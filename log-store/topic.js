const { Kafka } = require("kafkajs");

createTopic();

async function createTopic() {
  try {
    // Admin Stuff..
    const kafka = new Kafka({
      clientId: "kafka_log_store_client",
      brokers: ["localhost:9092"],
    });

    const admin = kafka.admin();
    console.log("Connecting to kafka broker...");
    await admin.connect();
    console.log("Connected to kafka broker...");

    await admin.createTopics({
      topics: [
        {
          topic: "LogStoreTopic",
          numPartitions: 2,
        },
      ],
    });
    console.log("Topic created successfully");
    await admin.disconnect();
  } catch (error) {
    console.log("Bir Hata Oluştu", error);
  } finally {
    process.exit(0);
  }
}
