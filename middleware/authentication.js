const jwt = require('jsonwebtoken')
require('dotenv').config()
const {SECRET} = process.env

exports.authUser = (req,res,next) => {
    // Check for an authorization token
    if(!req.headers.authorization){
        res.status(401).json({message: "Authorization Header required"})
    }
    // Split the header and authenticate the token
    let splitHeader = req.headers.authorization.split(' ')
    // Check if bearer is included in the format
    if(splitHeader[0] !== "Bearer"){
        res.status(401).json({message: "Expected format 'Bearer <token>'"})
    }
    // Authenticate the token with jwt
    let token = splitHeader[1]

    jwt.verify(token, SECRET, (err, decodedToken) => {
        if (err){
            res.status(500).json({err})
        }
        if (!decodedToken) {
            res.status(401).json({message: "Authorization error, Please Login"})
        }
        req.token = decodedToken
        req.user = decodedToken
    })
    // Move to the next function
    next()
}

exports.checkIsAdmin = (req,res,next) => {
    if (req.user.role !== "admin") {
        res.status(401).json({message: "Route restricted to admin only"})
    }
    next()
}