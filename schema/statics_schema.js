const { mongoose } = require("mongoose");

const staticsSchema = new mongoose.Schema({
    banners: {
        type: Object,
        default: {},
    },
});

const staticsModel = new mongoose.model("statics", staticsSchema);

module.exports = staticsModel;
