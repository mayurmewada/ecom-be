const express = require("express");
const { createOrder, myOrders } = require("../controllers/order_controller");
const { verifyToken } = require("../middlewares/auth_middleware");

const route = express.Router();

route.get("/create-order", verifyToken, createOrder);
route.get("/my-orders", verifyToken, myOrders);

module.exports = route;
