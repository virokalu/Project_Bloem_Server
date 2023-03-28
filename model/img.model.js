const mongoose =require('mongoose');
const db = require('../config/db');

const { Schema } = mongoose;


const imgSchema = new Schema({
    username:{
        type : String,
        lowercae:true,
        required:true,
        unique:true,
    },
    img:{
        type:String,
        required:true,
    }
});

const ImgModel = db.model('img',imgSchema);
module.exports = ImgModel;