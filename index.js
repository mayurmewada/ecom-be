const connectDB = require("./db/connect");
const express = require("express");
const productRoute = require("./routes/product_route");

const app = express();

app.use(express.json());

connectDB().then(() => {
    app.listen(5000, () => {
        console.log("app listening on port 5000");
    });
});

app.use("/api", productRoute);
