const jwt = require("jsonwebtoken");
const Razorpay = require("razorpay");

const instance = new Razorpay({
    key_id: process.env.RPKEYID,
    key_secret: process.env.RPKEYSECRET,
});

exports.createOrder = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
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
        const options = {
            amount: "100",
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

