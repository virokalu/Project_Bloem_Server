const mongoose = require('mongoose');
const db = require('../config/db');

const { Schema } = mongoose;


const cartSchema = new Schema(
    {
      username: {
        type: String,
        required: true,
      },
      items: [
        {
          item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "item",
            required: true,
          },
          qty: {
            type: Number,
            required: true,
          },
        },
      ],
    },
    {
      toJSON: {
        transform: function (model, ret) {
          ret.cartId = ret._id.toString();
          delete ret._id;
          delete ret.__v;
        },
      },
      timestamps: true,
    }
  );

const cart = db.model('cart',cartSchema);
module.exports = cart;