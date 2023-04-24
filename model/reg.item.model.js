const mongoose =require('mongoose');
const db = require('../config/db');

const { Schema } = mongoose;


const regBuyItemSchema = new Schema({
   
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
    username:{
        type : String,
        required:true,
    },
    id : {
        type : String,
        required : true,
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