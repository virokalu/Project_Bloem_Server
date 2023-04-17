const mongoose = require("mongoose");
const db = require("../config/db");

const { Schema } = mongoose;

const messageSchema = new Schema({
    type : {type: String},
    message : {type: String},
    sourceId : {type: String},
    targetId : {type: String},
    key : {type: String},
});

const Message = db.model('messages',messageSchema);

module.exports = Message;