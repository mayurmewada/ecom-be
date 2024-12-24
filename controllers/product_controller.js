const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const csvtojson = require("csvtojson");
const XLSX = require('xlsx');
const Product = require("../schema/product_schema");
const app = express();

app.use(express.json());

const getAllProducts = async (req, res) => {
    const products = await Product.find({});
    try {
        res.json({
            status: 200,
            res: products,
        });
    } catch (error) {
        console.log("error from /controllers/getAllProducts");
    }
};

const createProduct = (req, res) => {
    try {
        const { name, category, price, quantity, description } = req.body;
        const newProduct = new Product({ name, category, price, quantity, description });
        newProduct.save();
        res.json({
            status: 200,
            res: newProduct,
        });
    } catch (error) {
        console.log("error from /products/createProduct");
    }
};

const importProducts = async (req, res) => {
    try {
        const filePath = req.file.path;
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0]; // Get the first sheet
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]); // Convert to JSON
    
        // Insert data into MongoDB
        await Product.insertMany(data);
    
        res.status(200).send({ message: 'File uploaded and data saved successfully!' });
        res.json({
            status: 200,
            res: req,
        });
    } catch (error) {
        console.log("error from /products/importProducts");
    }
};

module.exports = { getAllProducts, createProduct, importProducts };
