const { client } = require("../../../loaders/database");

const query = {
  insertMessage:
    "INSERT INTO person_message (person_id,message) VALUES($1,$2) RETURNING *",
  getMessage: "SELECT * FROM person_message",
};

function Message() {}

Message.prototype.insertMessageToDb = async function (id, message) {
  const newMessage = await client.query(query.insertMessage, [id, message]);
  return newMessage.rows[0];
};
Message.prototype.getAllMessagesFromDb = async function () {
  const getMessages = await client.query("SELECT * FROM person_message");
  return getMessages.rows;
};

// async function insertMessageToDb(id, message) {
//   const newMessage = await client.query(query.insertMessage, [id, message]);
//   return newMessage.rows[0];
// }

// async function getAllMessagesFromDb() {
//   const getMessages = await client.query("SELECT * FROM person_message");
//   return getMessages.rows;
// }

module.exports = {
  // insertMessageToDb,
  // getAllMessagesFromDb,
  Message,
};
