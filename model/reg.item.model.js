const mongoose =require('mongoose');
const db = require('../config/db');

const { Schema } = mongoose;


const regBuyItemSchema = new Schema({

    //_id : false,
   
    street: {
        type : String,
        required : true,
    },
    town: {
        type : String,
        required : true,
    },
    postalCode : {
        type : String,
        required : true,
    },
    sellername:{
        type : String,
        required:true,
    },
    buyername: {
        type : String,
        required : true,
    },
    itemid : {
        type : String,
        required : true,
    },
    itemprice : {
        type : Number,
        required : true,
    },
    app_fee : {
        type : Number,
        //required : true,
    },
    seller_amount : {
        type : Number,
        //required : true,
    },
    apps_Total_amount : {
        type : Number,
        //required : true,
    },
    stid : {
        type : String,
    },
    category: {
        type : String,
    }

}
// ,{
//     toJSON:{
//         transform: function (doc,ret) {
//             ret.id = ret._id.toString();
//             delete ret._id;
//             delete ret.__v;
//         }
//     }
// }
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

const regBuyItemModel = db.model('regbuyitem',regBuyItemSchema);
module.exports = regBuyItemModel;