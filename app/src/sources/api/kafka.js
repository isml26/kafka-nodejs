const { KAFKA_CONFIG } = require("../../utils/config");
// connect to kafka

async function produceMessage(id, message) {
  try {
    await global.producer.send({
      topic: KAFKA_CONFIG.topic,
      messages: [
        {
          value: message,
          key: id,
          partition: 0,
        },
      ],
    });
    console.log("Data has been sent successfully");
  } catch (error) {
    console.log("producer.js/Something went wrong: ", error);
  }
}

// async function runConsumer() {
//   await global.consumer.run({
//     eachMessage: async (res) => {
//       console.log(
//         `Received message: ${res.message.value}, key:${res.message.key} , Partition => ${res.partition} `
//       );

//       if (res.message.key.toString() !== "1") {
//         client
//           .query(
//             "INSERT INTO person_message (person_id,message) VALUES($1,$2) RETURNING *",
//             [res.message.key.toString(), res.message.value.toString()]
//           )
//           .then(() => {
//             console.log("insreted to database");
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//       }
//     },
//   });
// }

module.exports = {
  produceMessage,
};
