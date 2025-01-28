const express = require("express");
const productModel = require("../schema/product_schema");
const app = express();
app.use(express.json());

const getHomeData = async (req, res) => {
    try {
        const categories = await productModel.distinct("category");
        const home = { banner: "", categories };
        res.json({
            status: 200,
            data: home,
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = { getHomeData };
