const { Kafka } = require("kafkajs");

// topic creation, pub-sub, get topics, redux-toolkit-thunk

createTopic();

async function createTopic() {
  try {
    // Admin Stuff..
    const kafka = new Kafka({
      clientId: "kafka_pub_sub_client",
      brokers: ["localhost:9092"],
    });

    const admin = kafka.admin();
    console.log("Connecting to kafka broker...");
    await admin.connect();
    console.log("Connected to kafka broker...");

    await admin.createTopics({
      waitForLeaders: true,
      topics: [
        {
          topic: "video_topic",
          numPartitions: 1,
        },
      ],
    });
    console.log("Topic created successfully");
    await admin.disconnect();
  } catch (error) {
    console.log("Something went wrong", error);
  } finally {
    process.exit(0);
  }
}
