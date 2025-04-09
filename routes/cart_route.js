const express = require("express");
const { addToCart, cartLength, cartDetails } = require("../controllers/cart_controller");
const route = express.Router();

route.post("/addtocart", addToCart);
route.get("/cartdetails", cartDetails);
route.get("/cartitems", cartLength);

module.exports = route;
