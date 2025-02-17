const mongoose = require("mongoose");

const PageView = new mongoose.Schema({
    path: {type: String},
    date: {
        type: Date,
        default: Date.now()},
    userAgent: {type: String},
    count: {
        type: Number,
        default: 0}
})

module.exports = mongoose.model('PageView', PageView)