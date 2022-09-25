const express = require('express');
const cartsRouter = express.Router();
const addToCart = require('../Controllers/carts');
const authentication = require('../middlewares/authentication');
const authurization = require('../middlewares/authorization');

cartsRouter.post('/add',authentication, authurization("add-to-cart"), addToCart);


module.exports = cartsRouter;