const express = require("express");
const { razorpayWebhook } = require("../controllers/webhook_controller");

const route = express.Router();

route.post("/razorpay/webhook", razorpayWebhook);

module.exports = route;
