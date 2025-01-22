const express = require("express");
const productModel = require("../schema/product_schema");
const app = express();
app.use(express.json());

const search = async (req, res) => {
    try {
        const { search } = req.body;
        const searchProducts = await productModel.find({ name: { $regex: search, $options: "i" } }).select("name");

        res.json({
            status: 200,
            data: searchProducts,
        });
    } catch (error) {
        res.json({
            msg: error,
        });
    }
};

module.exports = { search };
