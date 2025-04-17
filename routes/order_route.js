const express = require("express");
const { createOrder } = require("../controllers/order_controller");

const route = express.Router();

route.get("/create-order", createOrder);

module.exports = route;
