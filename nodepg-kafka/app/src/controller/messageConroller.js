const { createProducer } = require("../kafka/producer");
const { client } = require("../loaders/database");

async function sendMessage(req, res) {
  try {
    const { id, message } = req.body;
    if (!id || !message) {
      return res.status(400).json("Pls give id and message");
    }

    createProducer(id, message);

    const newMessage = await client.query(
      "INSERT INTO person_message (person_id,message) VALUES($1,$2) RETURNING *",
      [id, message]
    );
    return res.status(201).json(newMessage.rows[0]);
  } catch (error) {
    console.error(error);
  }
}

async function getMessages(req, res) {
  try {
    const getMessages = await client.query("SELECT * FROM person_message");
    return res.json(getMessages.rows);
  } catch (error) {
    return res.status(404).json(error.message);
  }
}

module.exports = {
  sendMessage,
  getMessages,
};
