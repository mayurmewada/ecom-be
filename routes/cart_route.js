const express = require("express");
const { addToCart } = require("../controllers/cart_controller");
const route = express.Router();

route.post("/addtocart", addToCart);

module.exports = route;
