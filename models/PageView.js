const { Schema, model } = require("mongoose");

const PageView = new Schema({
    path: String,
    date: Date.now(),
    userAgent: String
})