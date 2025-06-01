const connectDB = require("./db/connect");
const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const auth_route = require("./routes/auth_route");
const home_route = require("./routes/home_route");
const product_route = require("./routes/product_route");
const filter_route = require("./routes/filter_route");
const search_route = require("./routes/search_route");
const user_route = require("./routes/user_route");
const cart_route = require("./routes/cart_route");
const order_route = require("./routes/order_route");
const userModel = require("./schema/user_schema");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(
    cors({
        origin: (origin, callBack) => {
            if (!origin || origin === process.env.DOMAINREQACCESS) {
                callBack(null, true);
            } else {
                callBack(new Error("Not allowed by CORS"));
            }
        },
    })
);

connectDB().then(() => {
    app.listen(5000, () => {
        console.log("app listening on port 5000");
    });
});

app.use(express.static("public"));
app.use("/api", auth_route);
app.use("/api", home_route);
app.use("/api", product_route);
app.use("/api", filter_route);
app.use("/api", search_route);
app.use("/api", user_route);
app.use("/api", cart_route);
app.use("/api", order_route);

app.post("/api/razorpay/webhook", async (req, res) => {
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
                        amount: req?.body?.payload?.payment?.entity?.amount,
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
});
