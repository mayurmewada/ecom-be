const connectDB = require("./db/connect");
const express = require("express");
const cors = require("cors");
const auth_route = require("./routes/auth_route");
const home_route = require("./routes/home_route");
const product_route = require("./routes/product_route");
const filter_route = require("./routes/filter_route");
const search_route = require("./routes/search_route");
const user_route = require("./routes/user_route");
const cart_route = require("./routes/cart_route");
const order_route = require("./routes/order_route");
const webhook_route = require("./routes/webhook_route");
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
app.use("/api", webhook_route);
