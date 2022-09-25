const express = require('express');
const productsRouter = express.Router();
const addProduct = require('../controllers/products');

productsRouter.post('/', addProduct)

module.exports = productsRouter;
