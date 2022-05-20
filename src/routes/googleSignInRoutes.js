const express = require('express')
const router =  express.Router()

const {googleSignin, googleSigninCallback} = require('../controllers/authController')

router.get('/auth/google',googleSignin(passport))
router.get('/auth/google/callback',googleSigninCallback(passport))



module.exports = router