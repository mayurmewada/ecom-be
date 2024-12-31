const mongoose = require("mongoose");

const filterSchema = new mongoose.Schema({}, { strict: false });

const filterModel = new mongoose.model("filters", filterSchema);

module.exports = filterModel;
