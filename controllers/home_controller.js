const express = require("express");
const productModel = require("../schema/product_schema");
const staticsModel = require("../schema/statics_schema");
const app = express();
app.use(express.json());

const getHomeData = async (req, res) => {
    try {
        const categories = await productModel.distinct("category");
        const trendingProducts = await productModel.find({}).sort({ poularityCount: -1 }).limit(10).select("name images price brand");
        const home = { categories };
        res.json({
            status: 200,
            data: { home, trendingProducts },
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = { getHomeData };
