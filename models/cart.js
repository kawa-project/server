const { Schema, Model, model } = require('mongoose');

const CartSchema = new Schema(
    {
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        },
        color: {
            type: String
        },
        size: {
            type: Number
        },
        amount: {
            type: Number
        },
        cost: {
            type: Number
        },
        UserId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

const Cart = model('Cart', CartSchema);

module.exports = Cart;
