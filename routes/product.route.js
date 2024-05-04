const express = require("express");
const { productMensModel, productWomensModel } = require("../model/product.model");
const productRouter = express.Router();

async function fetchProducts(model, res) {
    try {
        const products = await model.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error: error.message });
    }
}

productRouter.get("/mens", (req, res) => {
    fetchProducts(productMensModel, res);
});

productRouter.get("/womens", (req, res) => {
    fetchProducts(productWomensModel, res);
});


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

productRouter.get("/mens/:id", async (req, res) => {
    fetchSingleProduct(productMensModel, req, res);
});

productRouter.get("/womens/:id", async (req, res) => {
    fetchSingleProduct(productWomensModel, req, res);
});

module.exports = {
    productRouter
}