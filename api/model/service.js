const mongoose = require("mongoose");

const serviceModel = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  description: String,
  excerpt: String,
  imageUrl: String,
});

module.exports = mongoose.model("Service", serviceModel);
