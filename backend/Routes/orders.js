const express = require('express');
const ordersRouter = express.Router();
const getUserOrders = require('../Controllers/orders');

ordersRouter.get('/:id', getUserOrders);


module.exports = ordersRouter;