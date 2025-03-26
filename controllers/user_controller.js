const jwt = require("jsonwebtoken");
const userModel = require("../schema/user_schema");

exports.getUserDetails = async (req, res) => {
    try {
        const { authorization } = req.headers;
        console.log(authorization);
        const isVerified = await jwt.verify(authorization.split(" ")[1], process.env.JWTSECRET);
        const isUser = await userModel.findOne({ _id: isVerified._id }).select("-password");
        res.status(200).json({
            data: isUser,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Internal Server Error",
        });
    }
};
