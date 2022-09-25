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

const updateProduct = (req, res) => {
    const {name, price, availableItems, type, image, gender, size, ageRange, season} = req.body;
    const selectedProductId = req.params.id;
    productsModel.findOneAndUpdate({_id: selectedProductId}, {name, price, type, availableItems, image, gender, size, ageRange, season}, {new:true})
    .then((result) => {
        const successObject = {
            success: true,
            message: "updated successfully",
            product: result
        }
        res.status(201).json(successObject);

    })
    .catch((err) => {
        res.status(404).json(err.message)
    })
}

const deleteProduct = (req, res) => {
    const selectedProduct = req.params.id;
    productsModel.findOneAndDelete({_id: selectedProduct})
    .then((result) => {
        const successObject = {
            success: true,
            message: "Product deleted successfully",
        }
        res.status(201).json(successObject);
    })
    .catch((err) => {
        res.status(401).json(err.message)
    })
}

const getAllProducts = (req, res) => {
    productsModel.find({})
    .populate("comments")
    .exec()
    .then((result) => {
        const successObject = {
            success: true,
            message: "All products",
            product: result
        }
        res.status(201).json(successObject);
    })
    .catch((err) => {
        res.status(401).json(err.message)
    })
}

const getProductById = (req, res) => {
    const selectedProduct = req.params.id;
    productsModel.find({_id: selectedProduct})
    .then((result) => {
        const successObject = {
            success: true,
            message: "Requested product",
            product: result
        }
        res.status(201).json(successObject);
    })
    .catch((err) => {
        res.status(404).json(err.message)
    })
}

module.exports = {addProduct, updateProduct, deleteProduct, getAllProducts, getProductById};