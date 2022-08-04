const { Client } = require("pg");
const { DATABASE_CONFIG } = require("../utils/config");

const client = new Client(DATABASE_CONFIG);

function connectDb() {
  client.connect(function (err) {
    if (err) throw err;
    console.log("Connected to database!!");
  });
}

module.exports = {
  connectDb,
  client
};
