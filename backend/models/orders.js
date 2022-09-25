const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({

cart: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
cost: {type: String},
time: {timestamps: true }

})

module.exports = mongoose.model( "Order", ordersSchema);