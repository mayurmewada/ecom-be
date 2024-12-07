const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    category: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    quantity: {
        type: Number,
        require: true,
    },
    description: {
        type: String,
        require: true,
    },
    images: {
        type: String,
        require: true,
    },
});

const Product = new mongoose.model("products", productSchema);

module.exports = Product;
