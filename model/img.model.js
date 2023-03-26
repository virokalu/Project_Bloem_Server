
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
        data:Buffer,
        contentType:String
    }
});

const ImgModel = db.model('imgprofile',imgSchema);
module.exports = ImgModel;