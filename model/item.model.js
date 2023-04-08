const mongoose =require('mongoose');
const db = require('../config/db');

const { Schema } = mongoose;


const itemSchema = new Schema({
    username:{
        type : String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    commonname:{
        type:String,
        required:true,
    },
    sciname:{
        type:String,
    },
    price:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    cashondelivery:{
        type:Boolean,
        required:true,
    },
    chatactivate:{
        type:Boolean,
        required:true
    },
    imgone:{
        type:String,
        required:true,
    },
    imgtwo:{
        type:String,
    },
    imgthree:{
        type:String,
    },
    activestatus:{
        type:Boolean,
        required:true,
    }
});

const ItemModel = db.model('item',itemSchema);
module.exports = ItemModel;