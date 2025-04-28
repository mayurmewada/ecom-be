const express = require("express");
const { getUserDetails } = require("../controllers/user_controller");
const { verifyToken } = require("../middlewares/auth_middleware");

const route = express.Router();

route.get("/getuserdetails", verifyToken, getUserDetails);

module.exports = route;
