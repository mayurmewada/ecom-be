const jwt = require("jsonwebtoken");
const userModel = require("../schema/user_schema");

exports.getUserDetails = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const isVerified = jwt.verify(token.split(" ")[1], process.env.JWTSECRET);
        const isUser = await userModel.findOne({ _id: isVerified._id }).select("-password -cart");
        res.status(200).json({
            isUser,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Internal Server Error",
        });
    }
};
