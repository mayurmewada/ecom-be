const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const XLSX = require("xlsx");
const { getAllProducts, createProduct, importProducts } = require("../controllers/product_controller");
const Product = require("../schema/product_schema");

const route = express.Router();

const upload = multer({ dest: "uploads/" });

route.get("/products", getAllProducts);
route.post("/product/create", createProduct);
route.post("/product/import", multer({ dest: "uploads/" }).any(), async (req, res) => {
    try {
        console.log(req.files[0].path);
        const filePath = req.files[0].path;
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        await Product.insertMany(data);

        res.status(200).send({ data, sheetName });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred" });
    }
});

module.exports = route;
