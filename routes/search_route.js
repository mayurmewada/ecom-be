const express = require("express");
const { search } = require("../controllers/search_controller");
const route = express.Router();

route.post("/search", search);

module.exports = route