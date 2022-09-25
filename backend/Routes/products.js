const express = require('express');
const productsRouter = express.Router();
const {addProduct, updateProduct} = require('../controllers/products');

productsRouter.post('/', addProduct)
productsRouter.put('/update/:id', updateProduct)

module.exports = productsRouter;
