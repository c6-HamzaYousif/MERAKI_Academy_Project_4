const express = require('express');
const productsRouter = express.Router();
const {addProduct, updateProduct, deleteProduct, getAllProducts, getProductById} = require('../controllers/products');

productsRouter.post('/', addProduct)
productsRouter.put('/update/:id', updateProduct)
productsRouter.delete('/:id', deleteProduct)
productsRouter.get('/', getAllProducts)
productsRouter.get('/:id', getProductById)


module.exports = productsRouter;
