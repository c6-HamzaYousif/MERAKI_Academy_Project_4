const mongoose = require('mongoose');

const commentsSchema = new mongoose.Schema({

comment: {type: String, required: true},
commenter: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

},  {timestamps: true })

module.exports = mongoose.model( "Comment", commentsSchema);