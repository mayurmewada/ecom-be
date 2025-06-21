const crypto = require("crypto");
const userModel = require("../schema/user_schema");
const productModel = require("../schema/product_schema");
require("dotenv").config();

exports.razorpayWebhook = async (req, res) => {
    const secret = process.env.RPKEYSECRET;
    const signature = req.headers["x-razorpay-signature"];
    const body = JSON.stringify(req.body);

    const expectedSignature = crypto.createHmac("sha256", secret).update(body).digest("hex");

    const saveOrderData = (cartProducts) => {
        return userModel.findOneAndUpdate(
            { _id: req?.body?.payload?.payment?.entity?.description },
            {
                $push: {
                    orders: {
                        _id: req?.body?.payload?.order?.entity?.receipt,
                        method: req?.body?.payload?.payment?.entity?.method,
                        refId: req?.body?.payload?.payment?.entity?.id,
                        amount: req?.body?.payload?.payment?.entity?.amount / 100,
                        contact: req?.body?.payload?.payment?.entity?.contact,
                        email: req?.body?.payload?.payment?.entity?.email,
                        date: req?.body?.payload?.payment?.entity?.created_at,
                        status: req.body.event === "order.paid" ? 1 : 0,
                        products: cartProducts?.cart,
                    },
                },
            },
            { new: true, upsert: false, runValidators: true }
        );
    };

    if (signature === expectedSignature) {
        const event = req?.body?.event;

        if (event === "order.paid") {
            const cartProducts = await userModel.findOne({ _id: req?.body?.payload?.payment?.entity?.description }).select("cart");
            await saveOrderData(cartProducts);
            await cartProducts?.cart?.map(async (product) => {
                await productModel.updateOne({ _id: product?._id }, { $inc: { poularityCount: 5 } });
            });
            await userModel.updateOne({ _id: req?.body?.payload?.payment?.entity?.description }, { $unset: { cart: "" } });
        } else if (event === "payment.failed") {
            const cartProducts = await userModel.findOne({ _id: req?.body?.payload?.payment?.entity?.description }).select("cart");
            await saveOrderData(cartProducts);
        }

        res.status(200).send("OK");
    } else {
        console.log("Invalid signature");
        res.status(400).send("Invalid signature");
    }
};
