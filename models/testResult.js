const mongoose = require('mongoose');

const schema = mongoose.Schema({
    date: Date,
    title: String
})

module.exports = mongoose.model("TestResult", schema);