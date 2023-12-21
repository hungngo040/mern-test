const express = require('express')

// controller functions
const {
    signupCustomer, loginCustomer
} = require('../controllers/customerController')

const router = express.Router()

// login route
router.post('/login', loginCustomer)

// signup route
router.post('/signup', signupCustomer)

module.exports = router