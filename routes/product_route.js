const express = require("express");
const { getAllProducts } = require("../controllers/product_controller");

const route = express.Router();

route.get("/products", getAllProducts);

module.exports = route;
