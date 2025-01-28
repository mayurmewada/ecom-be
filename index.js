const connectDB = require("./db/connect");
const express = require("express");
const cors = require("cors");
const home_route = require("./routes/home_route");
const product_route = require("./routes/product_route");
const filter_route = require("./routes/filter_route");
const search_route = require("./routes/search_route");

const app = express();

app.use(express.json());
app.use(cors());

connectDB().then(() => {
    app.listen(5000, () => {
        console.log("app listening on port 5000");
    });
});

app.use(express.static("public"));
app.use("/api", home_route);
app.use("/api", product_route);
app.use("/api", filter_route);
app.use("/api", search_route);
