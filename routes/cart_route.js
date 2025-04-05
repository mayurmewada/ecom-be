const express = require("express");
const { addToCart, cartLength } = require("../controllers/cart_controller");
const route = express.Router();

route.post("/addtocart", addToCart);
route.get("/cartitems", cartLength);

module.exports = route;
