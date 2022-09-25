const express = require('express');
const cartsModel = require('../models/carts')

const addToCart = (req, res) => {
    const {items, user} = req.body;
    const cartInstance = new cartsModel({items, user})
    .save()
    .then((result) => {
        const successObject = {
            success: true,
            message: "Product added successfully to your shopping cart",
            product: result
        }
        res.status(201).json(successObject);
    })
    .catch((err) => {
        res.status(404).json(err.message)
    })

}

const deleteCart = (req, res) => {
    const selectedCart = req.params.id;
    cartsModel.findOneAndDelete({_id: selectedCart})
    .then((result) => {
        const successObject = {
            success: true,
            message: "Item deleted successfully from your shopping cart",
        }
        res.status(201).json(successObject);
    })
    .catch((err) => {
        res.status(401).json(err.message)
    })
}

const getAllCarts = (req, res) => {
    const userCarts = req.params.id;
    cartsModel.find({user: userCarts})
    .populate("items")
    .exec()
    .then((result) => {
        const successObject = {
            success: true,
            message: "All carts",
            product: result
        }
        res.status(201).json(successObject);
    })
    .catch((err) => {
        res.status(401).json(err.message)
    })
}

module.exports = {addToCart, deleteCart, getAllCarts};

