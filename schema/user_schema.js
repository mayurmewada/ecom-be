const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: false,
    },
    cart: {
        type: Array,
        default: [{}, {}],
    },
});

const userModel = new mongoose.model("auth", userSchema);

module.exports = userModel;
