const express = require("express");
const { addToCart, cartLength, cartDetails } = require("../controllers/cart_controller");
const { verifyToken } = require("../middlewares/auth_middleware");
const route = express.Router();

route.post("/addtocart", verifyToken, addToCart);
route.get("/cartdetails", verifyToken, cartDetails);
route.get("/cartitems", verifyToken, cartLength);

module.exports = route;
