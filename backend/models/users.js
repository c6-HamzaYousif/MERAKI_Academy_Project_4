const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const usersSchema = new mongoose.Schema({

firstName: {type: String, required: true},
lastName: {type: String, required: true},
email: {type: String, required: true, unique: true, lowercase: true}, 
gender: {type: String},
password: {type: String, required: true},
age: {type: Number},
city: {type: String, required: true},
image: {type: String},
role: { type: mongoose.Schema.Types.ObjectId, ref: "Role" }
})

usersSchema.pre("save", async function (){
    this.password = await bcrypt.hash(this.password, 10)
})

module.exports = mongoose.model( "User", usersSchema);