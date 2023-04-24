const mongoose =require('mongoose');
const db = require('../config/db');

const { Schema } = mongoose;


const addCardSchema = new Schema({
   
    cardholdername : {
        type : String,
        required : true,
    },
    cardnumber : {
        type : String,
        required : true,
    },
    date : {
        type : String,
        required : true,
    },
    ccv : {
        type : String,
        required : true,
    },
    username : {
        type : String,
        required : true,
    }

}

);

const CardModel = db.model('cardDetails',addCardSchema);
module.exports = CardModel;