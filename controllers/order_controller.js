const jwt = require("jsonwebtoken");
const Razorpay = require("razorpay");
const userModel = require("../schema/user_schema");

const instance = new Razorpay({
    key_id: process.env.RPKEYID,
    key_secret: process.env.RPKEYSECRET,
});

const getTotalCartAmount = (cart) => {
    let total = 0;
    cart.map((item) => {
        total = total + item.price * item.qnty;
    });
    return total * 100;
};

exports.createOrder = async (req, res) => {
    try {
        const token = await req?.headers?.authorization;
        if (!token) {
            return res.status(400).json({
                status: false,
                message: "Unauthorized Request",
            });
        }
        const verifiedToken = jwt.verify(token, process.env.JWTSECRET);
        if (!verifiedToken) {
            return res.status(400).json({
                status: false,
                message: "Invalid Token",
            });
        }
        const getUserCart = await userModel.findOne({ _id: verifiedToken._id }).select("cart");

        const options = {
            amount: getTotalCartAmount(getUserCart.cart).toString(),
            currency: "INR",
            receipt: "receipt_12345abcde",
        };
        const order = await instance.orders.create(options);
        res.status(200).json({
            status: true,
            data: order,
        });
    } catch (error) {
        console.log(error.message || "Something went wrong");
    }
};
