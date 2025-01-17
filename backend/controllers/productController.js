import asyncHandler from './../middlewear/asyncHandler.js';
import Product from '../models/productModel.js'

const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products)
})

const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(404);
        throw new Error('Resource not found')
    }
    res.json(product)
})

export { getAllProducts, getProductById }