const Customer = require('../models/customermodel')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d'})
}

// customer login
const loginCustomer = async (req,res) =>{
    const {username, password} = req.body
    
    try {
        const customer = await Customer.login(username, password)
        
        // create a token
        const token = createToken(customer._id)

        res.status(200).json({username, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// customer signup
const signupCustomer = async (req,res) =>{
    const {username, password, email} = req.body

    try {
        const customer = await Customer.signup(username, password, email)
        
        // create a token
        const token = createToken(customer._id)
        
        res.status(200).json({username, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
 
 
    
}

module.exports = {
    signupCustomer,
    loginCustomer
}