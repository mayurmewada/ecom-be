const { mongoose } = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/ecom-db");
        console.log("db connection success");
    } catch (error) {
        console.log("db connection failed");
        process.exit(1);
    }
};

module.exports = connectDB