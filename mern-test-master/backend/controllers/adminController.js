const Admin = require('../models/adminmodel')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d'})
}
// admin login
const loginAdmin = async (req,res) =>{
    const {username, password} = req.body
    
    try {
        const admin = await Admin.login(username, password)
        
        // create a token
        const token = createToken(admin._id)

        res.status(200).json({username, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    
}

// admin signup
const signupAdmin = async (req,res) =>{
    const {username, password, email} = req.body

    try {
        const admin = await Admin.signup(username, password, email)
        
        // create a token
        const token = createToken(admin._id)

        res.status(200).json({username, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    
}




module.exports = {
    signupAdmin,
    loginAdmin
}