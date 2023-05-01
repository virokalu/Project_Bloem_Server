const mongoose = require("mongoose");

const cart = mongoose.model(
    "bucket",
    mongoose.Schema({
        username:{
            type: String,
            required: true
        },
        items:[
            {
                item:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"item",
                    require:true,
                },
                qty:{
                    type:Number,
                    required:true
                }
            }
        ]
    },{
        toJSON: {
            tranform: function(model,ret){
                ret.cartId = ret._id.toString();
                delete ret._id;
                delete ret.__v;
            }
        }
    },{
        timestamps: true 
    })
);

module.exports = {
    cart
}