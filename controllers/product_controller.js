const express = require("express");
const app = express();

app.use(express.json());

const getAllProducts = (req, res) => {
    const reqBody = req.body;
    try {
        res.json({
            status: 200,
            res: reqBody,
        });
    } catch (error) {
        console.log("error from /controllers/getAllProducts");
    }
};

const createProduct = (req, res) => {
    try {
        const { name, category, price, quantity, description } = req.body;
    } catch (error) {
        console.log("error from /products/createProduct");
    }
};

module.exports = { getAllProducts };
