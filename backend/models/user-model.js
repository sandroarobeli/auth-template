// Third party modules
const mongoose = require('mongoose')

// Define User Schema
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
})

// Define User class per its Schema (Blueprint)
const User = mongoose.model('User', userSchema)

module.exports = User