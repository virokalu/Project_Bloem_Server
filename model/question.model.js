const mongoose =require('mongoose');
const db = require('../config/db');

const { Schema } = mongoose;


const questionSchema = new Schema({
    username:{
        type : String,
        required:true,
    },
    question:{
        type:String,
        required:true,
    },
    answer:{
        type:String,
    },
    answerstatus:{
        type:Boolean,
        required:true,
    }

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

const QuestionModel = db.model('question',questionSchema);
module.exports = QuestionModel;