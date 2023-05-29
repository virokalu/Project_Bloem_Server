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
    district:{
        type:String,
    },
    activestatus:{
        type:Boolean,
        required:true,
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
// itemSchema.pre('save',async function(){
//     try {
//         var item = this;
//         item.itemId = item._id.toString();
//             // delete item._id;
//             // delete item.__v;
        

//     } catch (error) {
//         throw error;
//     }
// })

const ItemModel = db.model('item',itemSchema);
module.exports = ItemModel;