const mongoose =require('mongoose');
const db = require('../config/db');

const { Schema } = mongoose;


const regSellerSchema = new Schema({
   
    username : {
        type : String,
        required : true,
    },
    publishable_key : {
        type : String,
        required : true,
    },
    stripe_id : {
        type : String,
        required : true,
    },

}
,{
    toJSON:{
        transform: function (doc,ret) {
            ret.id = ret._id.toString();
            delete ret._id;
            delete ret.__v;
        }
    }
}
);


const regSellerModel = db.model('regseller',regSellerSchema);
module.exports = regSellerModel;