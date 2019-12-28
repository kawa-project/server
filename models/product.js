const { Schema, Model, model } = require('mongoose');

const AttributeSchema = new Schema({
    color: {
        type: 'String'
    },
    size: {
        type: Number,
        min: [0, 'Size cannot have negative value']
    },
    stock: {
        type: Number,
        min: [0, 'Stock cannot have negative value']
    }
});

const ProductSchema = new Schema(
    {
        name: {
            type: String
        },
        attributes: [AttributeSchema],
        price: {
            type: Number,
            min: [0, 'Price cannot have negative value']
        },
        image: {
            type: String
        },
        desc: {
            type: String
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

const Product = model('Product', ProductSchema);

module.exports = Product;
