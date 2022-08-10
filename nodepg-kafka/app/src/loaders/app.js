const express = require("express");
const personRoutes = require("../routes/message");
const app = express();

app.use(express.json());

app.use("/message", personRoutes);

app.get("/", (req, res) => {
  res.send("Kafka Api");
});

app.get("*",(req,res)=>{
  res.json({
    "error":"Cannot found given route"
  })
})


module.exports = app;