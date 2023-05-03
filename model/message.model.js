const mongoose = require("mongoose");
const db = require("../config/db");

const { Schema } = mongoose;

const messageSchema = new Schema({
    type : {type: String},
    message : {type: String},
    sourceName : {type: String},
    targetName : {type: String},
    time : {type : String}
});

const Message = db.model('messages',messageSchema);

module.exports = Message;