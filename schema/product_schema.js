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
    brand: {
        type: String,
        require: true,
    },
    ram: {
        type: String,
        require: true,
    },
    type: {
        type: String,
        require: true,
    },
    author: {
        type: String,
        require: true,
    },
    language: {
        type: String,
        require: true,
    },
    gender: {
        type: String,
        require: true,
    },
    years: {
        type: String,
        require: true,
    },
    size: {
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

const productModel = new mongoose.model("products", productSchema);

module.exports = productModel;
