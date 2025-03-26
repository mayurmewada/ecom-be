const express = require("express");
const { getUserDetails } = require("../controllers/user_controller");

const route = express.Router();

route.get("/getuserdetails", getUserDetails);

module.exports = route;
