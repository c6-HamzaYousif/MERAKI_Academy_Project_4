const express = require('express');
const ordersModel = require('../models/orders')

const getUserOrders = (req, res) => {
    const selectedUser = req.params.id;
    ordersModel.find({user: selectedUser})
    // .populate("cart")
    .populate({
        path : 'cart',
        populate : {
          path : 'items'
        }
      })
    .exec()
    .then((result) => {
        res.json(result)
    })
    .catch((err) => {
        res.json(err.message)
    })
}

module.exports = getUserOrders;