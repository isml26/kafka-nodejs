const { produceMessage } = require("../sources/api/kafka");
const {
  getAllMessagesFromDb,
  insertMessageToDb,
  Message,
} = require("../sources/db/tables/message");
const { validationResult } = require('express-validator');
const msg = new Message();

async function sendMessage(req, res) {
  // const errors = validationResult(req);
  // console.log(errors);
  try {
    const { id, message } = req.body;
    if (!id || !message) {
      return res.status(400).json("Pls give id and message");
    }

    const newMessage = await msg.insertMessageToDb(id, message);

    res.status(201).json(newMessage);
    
    return produceMessage(id, message);
  } catch (error) {
    const errors = validationResult(req);
    console.log(errors);
    return res.status(404).json({
      error: error.message,
    });
  }
}

async function getMessages(req, res) {
  try {
    const messages = await msg.getAllMessagesFromDb();
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(404).json({
      error: error.message,
    });
  }
}

module.exports = {
  sendMessage,
  getMessages,
};
