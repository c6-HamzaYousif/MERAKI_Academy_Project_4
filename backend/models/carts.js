const mongoose = require('mongoose');

const cartsSchema = new mongoose.Schema({

items: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
user: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
isOrdered: { type: Boolean, default: false},
counter: { type: Number, default: 1},

}, {timestamps: true })

module.exports = mongoose.model( "Cart", cartsSchema);