// Third party 
const express = require('express')
//const { check } = require('express-validator')

// Custom modules
const userControllers = require('../controllers/user-controllers')

// Initializing the router object
const router = express.Router()

// Signup a User
router.post('/signup', userControllers.signup)

// Login a User
router.post('/login', userControllers.login)



module.exports = router
