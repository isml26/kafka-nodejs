const { Client } = require("pg");
const { DATABASE_CONFIG } = require("../utils/config");

const client = new Client(DATABASE_CONFIG);

function connectDb() {
  return client.connect(function (err) {
    if (err) throw err;
    console.log("Connected to database!!");
  });
}


module.exports = {
  connectDb,
  client,
};


// const singleton = (function () {
//   let dbConn = null;

//   function createDbConn() {
//     if (dbConn === null) {
//       dbConn = client.connect(function (err) {
//         if (err) throw err;
//         console.log("Connected to database!!");
//       });
//       return dbConn;
//     }
//   }
//   return {
//     getDbConn: () => {
//       if (!dbConn) dbConn = createDbConn();

//       return dbConn;
//     },
//   };
// })();