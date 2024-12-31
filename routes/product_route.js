const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const XLSX = require("xlsx");
const { getAllProducts, createProduct, importProducts, getFilteredProducts } = require("../controllers/product_controller");
const Product = require("../schema/product_schema");

const route = express.Router();

const upload = multer({ dest: "uploads/" });

route.get("/products", getAllProducts);
route.post("/products/filter", getFilteredProducts);
route.post("/product/create", createProduct);
route.post("/product/import", multer({ dest: "uploads/" }).any(), importProducts);

module.exports = route;
