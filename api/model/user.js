const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    email: String,
    password: String,
    phone: Number,
    gender: String
})

module.exports = mongoose.model('User', userModel)