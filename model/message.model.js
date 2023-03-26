const mongoose = require("mongoose");
const db = require("../config/db");

const { Schema } = mongoose;

const messageSchema = new Schema({
    sender : {type: String},
    reciver: {type: String},
    message: {type: String},
    time: {timestamp: Date},
});

const Message = db.model('messages',messageSchema);

module.exports = Message;