const { Kafka } = require("kafkajs");

createConsumer();

async function createConsumer() {
  try {
    const kafka = new Kafka({
      clientId: "kafka_pub_sub_client",
      brokers: ["localhost:9092"],
    });

    const consumer = kafka.consumer({
      groupId: "mobile_encoder_consumer_group",
    });

    console.log("Connecting to kafka consumer...");
    await consumer.connect();
    console.log("Connected to kafka consumer...");

    // Consumer Subscribe..
    await consumer.subscribe({
      topic: "video_topic",
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async (result) => {
        console.log(
          `Received message: ${result.message.value}_mobile_encoder`
        );
      },
    });
  } catch (error) {
    console.log("consumer.js/Something went wrong: ", error);
  }
}
