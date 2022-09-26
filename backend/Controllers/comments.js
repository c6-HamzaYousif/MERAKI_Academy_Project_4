const express = require('express');
const commentsModel = require('../models/comments')
const productsModel = require('../models/products')

const addComments = (req, res) => {
    const selectedProduct = req.params.id
    const {comment, commenter} = req.body;
    const commentInstance = new commentsModel({comment, commenter})
    .save()
    .then((result) => {
        productsModel.findOneAndUpdate({_id: selectedProduct}, {$push: {comments: result._id }})
        .then((result) => {
            const successObject = {
                success: true,
                message: "Comment added successfully",
            }
            res.status(201).json(successObject);
        })
        .catch((err) => {
            res.status(404).json(err.message)
        })
    })
    .catch((err) => {
        res.status(404).json(err.message)
    })
}

module.exports = addComments;