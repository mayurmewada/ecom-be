const jwt = require("jsonwebtoken");
const productModel = require("../schema/product_schema");
const userModel = require("../schema/user_schema");

const addToCart = async (req, res) => {
    try {
        const [productId, qntyCount, action] = req.body;
        const findProduct = await productModel.findOne({ _id: productId }).select("_id name price images brand");

        let qntyQuery;
        if (action === "incr") {
            qntyQuery = { $inc: { "cart.$.qnty": qntyCount } };
        } else if (action === "decr") {
            qntyQuery = { $inc: { "cart.$.qnty": -qntyCount } };
        }
        const productExistInUserCart = await userModel.findOne({ _id: req.userId, "cart._id": productId },  { "cart.$": 1 });
        if (!productExistInUserCart) {
            if (action === "incr") {
                const initializeUserCart = await userModel.findOneAndUpdate(
                    { _id: req.userId },
                    {
                        $push: {
                            cart: {
                                _id: productId,
                                qnty: qntyCount,
                                name: findProduct.name,
                                price: findProduct.price,
                                images: findProduct.images,
                                brand: findProduct.brand,
                            },
                        },
                    },
                    { new: true, upsert: false, runValidators: true }
                );
                await productModel.updateOne({ _id: productId }, { $inc: { poularityCount: 3 } });
                return res.status(200).json({
                    success: true,
                    message: "Product added to cart.",
                    data: initializeUserCart.cart,
                });
            } else {
                return res.status(400).json({ success: false, message: "Product not found in cart to decrement." });
            }
        } else {
            if ((productExistInUserCart.cart[0].qnty <= qntyCount) && (action === "decr")) {
                await userModel.findOneAndUpdate({ _id: req.userId }, { $pull: { cart: { _id: productId } } }, { new: true, upsert: false, runValidators: true });
                return res.status(200).json({
                    success: true,
                    message: "Product removed from Cart",
                });
            }
        }
        await userModel.findOneAndUpdate({ _id: req.userId, "cart._id": productId }, qntyQuery, { new: true, upsert: false, runValidators: true });

        return res.status(200).json({
            success: true,
            message: "Quantity updated in Cart",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message || "Something went wrong",
        });
    }
};

const cartDetails = async (req, res) => {
    try {
        const data = await userModel.findOne({ _id: req.userId }).select("cart");
        return res.status(200).json({
            success: true,
            message: "Cart fetched Successfully",
            data,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message || "Something went wrong",
        });
    }
};

const cartLength = async (req, res) => {
    try {
        const { cart } = await userModel.findOne({ _id: req.userId }).select("cart");
        let totalCartItems = 0;
        cart.map((item) => totalCartItems += item.qnty)
        return res.status(200).json({
            success: true,
            data: totalCartItems,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message || "Something went wrong",
        });
    }
};

module.exports = { addToCart, cartDetails, cartLength };
