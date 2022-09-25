const express = require('express');
const productsModel = require('../models/products');

const addProduct = (req, res) => {
    const {name, price, availableItems, type, image, gender, size, ageRange, season} = req.body;
    const productInstance = new productsModel({name, price, availableItems, type, image, gender, size, ageRange, season})
    .save()
    .then((result) => {
        const successObject = {
            success: true,
            product: result
        }
        res.status(201).json(successObject);
    })
    .catch((err)=>{
        res.status(404).json("error adding the product");
    })
}

module.exports = addProduct;