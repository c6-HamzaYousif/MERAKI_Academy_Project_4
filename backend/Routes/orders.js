const express = require('express');
const ordersRouter = express.Router();
// const {addToCart, deleteCart, getAllCarts, addOneToCart, removeOneFromCart, changeQuantity} = require('../Controllers/carts');

// const authentication = require('../middlewares/authentication');
// const authurization = require('../middlewares/authorization');

// cartsRouter.post('/add',authentication, authurization("add-to-cart"), addToCart);
// cartsRouter.put('/addOne/:id',authentication, authurization("add-to-cart"), addOneToCart);
// cartsRouter.put('/change/:id',authentication, authurization("add-to-cart"), changeQuantity);
// cartsRouter.put('/removeOne/:id',authentication, authurization("remove-from-cart"), removeOneFromCart);
// cartsRouter.delete('/delete/:id',authentication, authurization("remove-from-cart"), deleteCart);
// cartsRouter.get('/:id',authentication, authurization("show-carts"), getAllCarts);


module.exports = ordersRouter;