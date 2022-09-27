const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({

comment: {type: String, required: true},
commenter: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
image: {type: String},
firstName: {type: String}

},  {timestamps: true })

module.exports = mongoose.model( "Comment", commentsSchema);