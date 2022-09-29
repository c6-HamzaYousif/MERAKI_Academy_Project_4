const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({

name: {type: String, required: true},
price: {type: Number, required: true},
type: {type: String},
availableItems: {type: Number},
image: {type: String, required: true},
gender: {type: String},
size: [{type: String}],
ageRange: {type: String},
season: [{type: String}],
comments: [{type: mongoose.Schema.Types.ObjectId, ref: "Comment" }]

})

module.exports = mongoose.model( "Product", productsSchema);