const express = require('express')
const router =  express.Router()

const {signupUser, loginUser, homePage} = require('../controllers/authController')

// Authentication Routes
router.post('/signup', signupUser)
router.post('/login', loginUser)
router.get('/homepage', homePage)


module.exports = router