const express = require("express");
const { signup, login } = require("../controllers/auth_controller");

const route = express.Router();

route.post("/login", login);
route.post("/signup", signup);
route.post("/forgot-password");

module.exports = route;
