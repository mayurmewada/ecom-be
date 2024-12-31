const express = require("express");
const { getFilters } = require("../controllers/filter_controller");
const route = express.Router();

route.post("/filters", getFilters);

module.exports = route;
