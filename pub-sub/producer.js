const { Kafka } = require("kafkajs");

createProducer();

async function createProducer() {
  try {
    const kafka = new Kafka({
      clientId: "kafka_pub_sub_client",
      brokers: ["localhost:9092"],
    });

    const producer = kafka.producer();
    console.log("Connecting to producer..");
    await producer.connect();
    console.log("Connected successfully.");

    const message_result = await producer.send({
      topic: "video_topic",
      messages: [
        {
          value: "New video content",
          partition: 0,
        },
      ],
    });
    console.log("Successfully sended", JSON.stringify(message_result));
    await producer.disconnect();
  } catch (error) {
    console.log("Bir Hata Oluştu", error);
  } finally {
    process.exit(0);
  }
}
