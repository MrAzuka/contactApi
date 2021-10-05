const Users = require('../models/Users')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()

const {SECRET, EXPIRE_TIME} = process.env


exports.signupUser = (req,res) => {
    // fetch email
    // check if email already exist
    Users.findOne({email: req.body.email}, (err,existingUser) => {
        if (err) {
            res.status(500).json({err})
        }
        if(existingUser) {
            // res.status(400).json({message: "A user already has that email"})
            res.redirect("login.ejs")
        }
        // Create new user
        Users.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email
        }, (err, newUser) => {
            if(err){
             res.status(500).json({err})
            }
            // hash the password
            bcrypt.genSalt(10,(err, salt) => {
                if(err) {
                    res.status(500).json({err})
                }
                bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
                    if (err) {
                        res.status(500).json({err})
                    }
                    // save the password to the database
                    newUser.password = hashedPassword
                    newUser.save((err, savedUser) => {
                        if (err) {
                            res.status(500).json({err})
                        }
                        // create jwt for users
                        jwt.sign({
                            id: newUser._id,
                            email: newUser.email,
                            firstName: newUser.firstName,
                            lastName: newUser.lastName,
                            role: newUser.role
                        }, SECRET, {expiresIn: EXPIRE_TIME},
                        (err, token) => {
                            if (err) {
                                res.status(500).json({err})
                            }else{
                                res.status(200).json({message: "User Registration Successful", token})
                                res.render("signup.ejs")
                            }
                        } )
                    })
                })
            })
        })
    })
}

exports.loginUser = (req,res) => {
    // Check if email exist
    Users.findOne({email: req.body.email}, (err,existingUser) => {
        if (err) {
            res.status(500).json({err})
        }
        if(!existingUser) {
            res.status(401).json({message: "Incorrect Username"})
        }
        // Compare passowrd with hashed password
        let matchedPassword = bcrypt.compareSync(req.body.password, existingUser.password)
        if(!matchedPassword){
            res.status(401).json({message: "Incorrect password"})
        } 
        
        // Create a token
        jwt.sign({
            id: existingUser._id,
            email: existingUser.email,
            firstName: existingUser.firstName,
            lastName: existingUser.lastName,
            role: existingUser.role
        }, SECRET, {expiresIn: EXPIRE_TIME},
        (err, token) => {
            if (err) {
                res.status(500).json({err})
            }else{
                // res.status(200).json({message: "Login Successful", token})
                res.render("login.ejs")
            }
        })
    })
}

exports.homePage = (req,res) => {
    res.render("login.ejs")
}