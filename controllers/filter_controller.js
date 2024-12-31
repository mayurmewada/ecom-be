const express = require("express");
const filterModel = require("../schema/filter_schema");

const app = express();
app.use(express.json());

const getFilters = async (req, res) => {
    try {
        const { category } = await req.body;
        const filters = await filterModel.find({ category });
        res.json({
            status: 200,
            data: filters,
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = { getFilters };
