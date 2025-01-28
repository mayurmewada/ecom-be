const express = require("express");
const { getHomeData } = require("../controllers/home_controller");

const route = express.Router();

route.get("/home", getHomeData);

module.exports = route;
