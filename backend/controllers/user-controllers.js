// Third party
const jwt = require('jsonwebtoken')
require("dotenv").config();

// Custom
const User = require('../models/user-model')


// Signup a User
const signup = async (req, res, next) => {
    const { userName, email, password  } = req.body
    try {
        const createdUser = new User({
            userName,
            email,
            password
        })
        await createdUser.save()

        // Generating token  
        let token
        try {
            // UserId: createdUser._id is encoded into token using unique secret key 
            token = jwt.sign(
                { userId: createdUser._id },
                process.env.SECRET_TOKEN_KEY,
                { expiresIn: '1h' }
            )
        } catch (error) {
            return next(new Error(`Creating User failed: ${error.message}`))
        }
        
        // Sending back whatever data we want with created token
        // res.status(201).json({ user: createdUser })
        res.status(201).json({ user: { userName: createdUser.userName, email: createdUser.email, userId: createdUser._id, token: token } })
    } catch (error) {
      return next(new Error(`Creating User failed: ${error.message}`)) 
    }
}


const login = async (req, res, next) => {
    const { email, password } = req.body
    try {
        let currentUser = await User.findOne({ email: email })
        if (!currentUser) {
            return next(new Error('The user does not exist. Please sign up'))
        }
        if (currentUser.password !== password) {
            return next(new Error('Invalid credentials'))
        }

        // Generating token  
        let token
        try {
            // UserId: currentUser._id is encoded into token using unique secret key 
            token = jwt.sign(
                { userId: currentUser._id },
                process.env.SECRET_TOKEN_KEY,
                { expiresIn: '1h' }
            )
        } catch (error) {
            return next(new Error(`Logging User failed: ${error.message}`))
        }
        
        // Sending back whatever data we want with created token
        // res.status(201).json({ user: createdUser })
        res.status(200).json({ user: { userName: currentUser.userName, email: currentUser.email, userId: currentUser._id, token: token } })

    } catch (error) {
        return next(new Error(`Login User failed: ${error.message}`))
    }
   
}


exports.signup = signup
exports.login = login