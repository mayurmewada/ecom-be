const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
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
});

const authModel = new mongoose.model("auth", authSchema);

module.exports = authModel;
