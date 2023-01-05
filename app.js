const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const userRoute = require("./api/routes/user");
const serviceRoute = require("./api/routes/service");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(
  "mongodb+srv://bhusal89:Aspirem5@learn-mern.yvncjle.mongodb.net/?retryWrites=true&w=majority"
);
mongoose.connection.on("error", (err) => console.log(err));
mongoose.connection.on("connected", (connected) =>
  console.log("Connected with Mongodb")
);

app.use("/user", userRoute);
app.use("/service", serviceRoute);

app.use((req, res, next) => {
  res.status(404).json({
    error: "Url not found",
  });
});

module.exports = app;
