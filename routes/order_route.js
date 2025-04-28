const express = require("express");
const { createOrder } = require("../controllers/order_controller");
const { verifyToken } = require("../middlewares/auth_middleware");

const route = express.Router();

route.get("/create-order", verifyToken, createOrder);

module.exports = route;
