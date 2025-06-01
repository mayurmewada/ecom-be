const Razorpay = require("razorpay");
const userModel = require("../schema/user_schema");
const { v4: uuidv4 } = require("uuid");

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
        const getUserCart = await userModel.findOne({ _id: req.userId }).select("cart");

        const options = {
            amount: getTotalCartAmount(getUserCart.cart).toString(),
            currency: "INR",
            receipt: await uuidv4(),
        };
        const order = await instance.orders.create(options);
        res.status(200).json({
            status: true,
            data: order,
        });
    } catch (error) {
        console.log(error, "error");
    }
};

exports.myOrders = async (req, res) => {
    try {
        const userOrders = await userModel.findOne({ _id: req.userId }).select("orders");
        res.status(200).json({
            status: true,
            data: userOrders,
        });
    } catch (error) {
        console.log(error, "error");
    }
};
