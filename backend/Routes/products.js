const express = require('express');
const productsRouter = express.Router();
const {addProduct, updateProduct, deleteProduct} = require('../controllers/products');

productsRouter.post('/', addProduct)
productsRouter.put('/update/:id', updateProduct)
productsRouter.delete('/:id', deleteProduct)


module.exports = productsRouter;
