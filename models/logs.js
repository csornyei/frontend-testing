const mongoose = require('mongoose');

const schema = mongoose.Schema({
    date: Date,
    route: String,
    ip: String
})

module.exports = mongoose.model("Log", schema);