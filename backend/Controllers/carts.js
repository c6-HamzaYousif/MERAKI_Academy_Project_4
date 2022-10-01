const express = require('express');
const cartsModel = require('../models/carts')

// const addToCart = (req, res) => {
//     const {items, user} = req.body;
//     const cartInstance = new cartsModel({items, user})
//     .save()
//     .then((result) => {
//         const successObject = {
//             success: true,
//             message: "Product added successfully to your shopping cart",
//             product: result
//         }
//         res.status(201).json(successObject);
//     })
//     .catch((err) => {
//         res.status(404).json(err.message)
//     })

// }
//-----------------------------
const addToCart = (req, res) => {
    const {items, user} = req.body;
    cartsModel.find({items: items})
    .then((result) => {
        if(result.length === 0){
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
        }else{
            console.log(result);
            let x = result[0].counter + 1
            console.log(x);
            cartsModel.findOneAndUpdate({items: items}, {items, user, counter: x}, {new:true})
            .then((result) => {
                res.status(201).json(result);
            })
            .catch((err) => {
                res.status(404).json(err.message)

            })
        }
    })
    .catch((err) => {
        res.status(404).json(err.message)
    })
    
}
//------------------

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

const addOneToCart = (req, res) => {
    const selectedCart = req.params.id;
    cartsModel.find({ notInSchema: { _id: selectedCart } })
    .then((result) => {
        console.log("after find", result);
        const items = result[0].items;
        const user = result[0].user;
        const newCounter = result[0].counter + 1;
        cartsModel.findOneAndUpdate({ notInSchema: { _id: selectedCart } }, {items, user, counter: newCounter})
        .then((result) => {
            console.log("after update", result);

            const successObject = {
                success: true,
                message: "updated carts",
                product: result
            }
            res.status(201).json(successObject);
        })
        .catch((err) => {
            res.status(401).json(err.message)
        })
    })
    .catch((err) => {
        res.status(401).json(err.message)
    })
}

const removeOneFromCart = (req, res) => {
    const selectedCart = req.params.id;
    cartsModel.find({ notInSchema: { _id: selectedCart } } )
    .then((result) => {
        console.log("after find", result);
        // console.log("hell");
        const items = result[0].items;
        const user = result[0].user;
        const newCounter = result[0].counter - 1;
        cartsModel.findOneAndUpdate({ notInSchema: { _id: selectedCart } }, {items, user, counter: newCounter})
        .then((result) => {
            console.log("after update", result);
            const successObject = {
                success: true,
                message: "updated carts",
                product: result
            }
            res.status(201).json(successObject);
        })
        .catch((err) => {
            res.status(401).json(err.message)
        })
    })
    .catch((err) => {
        res.status(401).json(err.message)
    })
}

const changeQuantity = (req, res) => {
    const selectedCart = req.params.id;
    const {items, user, counter} = req.body;
    cartsModel.findOneAndUpdate({ notInSchema: { _id: selectedCart } } ,{items, user, counter}, {new: true})
    .then((result)=>{
        console.log(result);
        res.json((result))
    })
    .catch((err) => {
        res.json(err)
    })
}

module.exports = {addToCart, deleteCart, getAllCarts, addOneToCart, removeOneFromCart, changeQuantity};

