const mongoose = require('mongoose');
const db = require('../config/db');

const { Schema } = mongoose;

const chatlistSchema = new Schema({
    name : {type:  String},
    // time : {type: String},
    currentpage : {type: String},
    users: {type : [String]},
    img : {type : String},
    id : {type : String},
});

const chatlist = db.model('chatlists',chatlistSchema,);

module.exports = chatlist;