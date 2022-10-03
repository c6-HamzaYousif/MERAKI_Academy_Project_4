const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({

cart: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

}, {timestamps: true })

module.exports = mongoose.model( "Order", ordersSchema);