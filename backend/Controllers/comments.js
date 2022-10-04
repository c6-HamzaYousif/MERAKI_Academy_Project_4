const express = require('express');
const commentsModel = require('../models/comments')
const productsModel = require('../models/products')

const addComments = (req, res) => {
    let theChange = ''
    const selectedProduct = req.params.id
    const {comment, commenter, image, firstName} = req.body; 
    const commentInstance = new commentsModel({comment, commenter, image, firstName})
    .save()
    .then((result) => {
        theChange = result;
        productsModel.findOneAndUpdate({_id: selectedProduct}, {$push: {comments: result._id }})
        .then((result) => {
            const successObject = {
                success: true,
                message: "Comment added successfully",
                comment: result,
                newVal: theChange
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

const getAllComments = (req, res) => {
    const selectedProduct = req.params.id
    productsModel.find({_id: selectedProduct})
    .populate("comments")
    .exec()
    .then((result) => {
        res.status(201).json(result);
    })
    .catch((err) => {
        res.status(404).json("error")
    })
}

module.exports = {addComments, getAllComments};