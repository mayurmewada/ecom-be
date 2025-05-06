const jwt = require("jsonwebtoken");
const userModel = require("../schema/user_schema");

exports.verifyToken = async (req, res, next) => {
    try {
        const token = req?.headers?.authorization;
        const isRealToken = await jwt.verify(token, process.env.JWTSECRET);
        if (!isRealToken) {
            return res.status(404).json({
                status: false,
                message: "Invalid User",
                clearToken: true,
            });
        }
        const isVerifiedToken = await userModel.findOne({ _id: isRealToken._id }).select("token");
        if (token !== isVerifiedToken.token) {
            return res.status(400).json({
                status: false,
                message: "Invalid Token",
                clearToken: true,
            });
        }
        req.userId = isRealToken._id;
        next();
    } catch (error) {
        return res.status(400).json({
            status: false,
            message: error.message,
            clearToken: true,
        });
    }
};
