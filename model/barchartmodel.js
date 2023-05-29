const mongoose = require('mongoose');
const db = require('../config/db');

const { Schema } = mongoose;

const barchartSchema = new Schema({
    category : {type:  String},
    price : {type: Number},
    color : {type: String},
    //user_id : {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    username: {type: String,required: true},
});

const barchart = db.model('barchart',barchartSchema,);

module.exports = barchart;