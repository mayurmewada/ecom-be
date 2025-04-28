const jwt = require("jsonwebtoken");
const userModel = require("../schema/user_schema");

exports.getUserDetails = async (req, res) => {
    try {
        const isUser = await userModel.findOne({ _id: req.userId }).select("_id email phone");
        res.status(200).json({
            isUser,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Internal Server Error",
        });
    }
};