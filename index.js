const connectDB = require("./db/connect");
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const csvtojson = require("csvtojson");
const product_route = require("./routes/product_route");
const filter_route = require("./routes/filter_route");

const app = express();

app.use(express.json());
app.use(cors());

connectDB().then(() => {
    app.listen(5000, () => {
        console.log("app listening on port 5000");
    });
});

app.use(express.static("public"));
app.use("/api", product_route);
app.use("/api", filter_route);
