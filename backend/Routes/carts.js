const express = require('express');
const cartsRouter = express.Router();
const {addToCart, deleteCart, getAllCarts} = require('../Controllers/carts');

const authentication = require('../middlewares/authentication');
const authurization = require('../middlewares/authorization');

cartsRouter.post('/add',authentication, authurization("add-to-cart"), addToCart);
cartsRouter.delete('/delete/:id',authentication, authurization("remove-from-cart"), deleteCart);
cartsRouter.get('/:id',authentication, authurization("show-carts"), getAllCarts);


module.exports = cartsRouter;