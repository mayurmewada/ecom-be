const express = require("express");
const XLSX = require("xlsx");
const productModel = require("../schema/product_schema");
const app = express();

app.use(express.json());

const getAllProducts = async (req, res) => {
    const { category } = req.body;
    const products = await productModel.where({ category: category }).select("name images price brand");

    try {
        res.json({
            status: 200,
            res: products,
        });
    } catch (error) {
        console.log("error from /controllers/getAllProducts");
    }
};

const createProduct = async (req, res) => {
    try {
        const { name, category, price, quantity, description } = req.body;
        const newProduct = new productModel({ name, category, price, quantity, description });
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
        console.log(req.files[0].path);
        const filePath = req.files[0].path;
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

        await productModel.deleteMany();

        await productModel.insertMany(data);

        res.status(200).send({ data, sheetName });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An error occurred" });
    }
};

const getFilteredProducts = async (req, res) => {
    try {
        const [category, filters] = req.body;
        console.log(category, filters);
        const constructQuery = (filters) => {
            const query = {};

            filters.forEach((filter) => {
                if (filter.values.length > 0) {
                    query[filter.name.toLowerCase()] = { $in: filter.values };
                }
            });

            console.log(query);
            return query;
        };
        const query = constructQuery(filters);
        const products = await productModel.where({ category: category }).find(query);

        res.status(200).json({
            data: products,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            messgae: "error from product_controller/getFilteredProducts",
            error,
        });
    }
};

const getProductDetails = async (req, res) => {
    try {
        const { productId } = req.body;
        const productDetail = await productModel.find({ _id: productId });
        if (productDetail.length > 0) {
            res.status(200).json({
                status: 200,
                data: productDetail,
            });
        } else {
            res.status(200).json({
                status: 404,
                messgae: "Page not Found",
            });
        }
    } catch (error) {
        res.status(200).json({
            status: 404,
            messgae: "error from product_controller/getProductDetails",
            error: error
        });
    }
};

module.exports = { getAllProducts, createProduct, importProducts, getFilteredProducts, getProductDetails };
