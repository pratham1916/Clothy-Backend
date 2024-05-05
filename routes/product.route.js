const express = require("express");
const { productMensModel, productWomensModel } = require("../model/product.model");
const productRouter = express.Router();

async function fetchALLProducts(model, res) {
    try {
        const products = await model.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error: error.message });
    }
}

async function fetchSingleProduct(model, req, res) {
    const _id = req.params.id;
    try {
        const singleProduct = await model.findById(_id);
        if (!singleProduct) {
            return res.status(404).json({ message: `No product found with the ID ${_id}` });
        }
        else{
            res.status(200).json(singleProduct);
        }
    } catch (error) {
        res.status(500).json({ message: "Error fetching Single Product", error: error.message });
    }
}

async function fetchProducts(model, req, res) {
    const { page = 1, limit = 12, category, sort } = req.query;
    const skip = (page - 1) * limit;

    try {
        const query = {};
        if (category) {
            query.category = category;
        }

        let sortOptions = {};
        if (sort === 'asc' || sort === 'desc') {
            sortOptions.price = sort === 'asc' ? 1 : -1;
        }
        
        const products = await model.find(query).sort(sortOptions).skip(skip).limit(limit);
        const total = await model.countDocuments(query);

        res.status(200).json({ products, total });
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error: error.message });
    }
}

productRouter.get("/mens/all", (req, res) => {
    fetchALLProducts(productMensModel, res);
});

productRouter.get("/womens/all", (req, res) => {
    fetchALLProducts(productWomensModel, res);
});

productRouter.get("/mens/:id", async (req, res) => {
    fetchSingleProduct(productMensModel, req, res);
});

productRouter.get("/womens/:id", async (req, res) => {
    fetchSingleProduct(productWomensModel, req, res);
});

productRouter.get("/mens", (req, res) => {
    fetchProducts(productMensModel, req, res);
});

productRouter.get("/womens", (req, res) => {
    fetchProducts(productWomensModel, req, res);
});

module.exports = {
    productRouter
}