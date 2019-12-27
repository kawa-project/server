const { Schema, model, Model } = require('mongoose');

const TransactionSchema = new Schema(
    {
        listProduct: [
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
                cost: {
                    type: Number
                },
                amount: {
                    type: Number
                }
            }
        ],
        totalCost: {
            type: Number
        },
        UserId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        status: {
            type: String,
            enum: ['unpaid', 'paid', 'sent', 'received']
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

const Transaction = model('Transaction', TransactionSchema);

module.exports = Transaction;
