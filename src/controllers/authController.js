const Users = require('../models/user_Model')
const {
    createToken
} = require('../utils/token')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()

const {
    JWT_SECRET,
    JWT_EXPIRE_TIME
} = process.env


export const signupUser = async (req, res) => {

    try {
        // fetch email
        // check if email already exist
        const findUser = await Users.findOne({
            email: req.body.email
        })

        if (findUser) {
            res.status(400).json({
                message: "A user already has that email"
            })
        }
        const salt = bcrypt.genSalt(10)
        const hashedPassword = bcrypt.hash(req.body.password, salt)
        const createUser = await Users.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword
        })

        const newUser = createUser.save()

        if (newUser) {
            res.status(200).json({
                message: "User Registration Successful",

            })
        }

    } catch (err) {
        res.status(400).json({
            message: "Error",
            err
        })
    }

}

export const loginUser = async (req, res) => {
    try {
        // fetch email
        // check if email already exist
        const findUser = await Users.findOne({
            email: req.body.email
        })

        if (!findUser) {
            res.status(401).json({
                message: "Incorrect Email"
            })
        }

        // Compare passowrd with hashed password
        let matchedPassword = bcrypt.compareSync(req.body.password, findUser.password)
        if (!matchedPassword) {
            res.status(401).json({
                message: "Incorrect password"
            })
        }

        // Create Token 
        const token = createToken(findUser.email)

        res.status(200).json({
            message: "Login Successful",
            Token: token
        })
    } catch (err) {
        res.status(400).json({
            message: "Error",
            err
        })
    }
}

export const googleSignin = (passport) => {
    return passport.authenticate("google", { scope: ["email", "profile"] });
}

export const googleSigninCallback = (passport) => {
    return passport.authenticate("google", {
        successRedirect: "/api/v2/contact/",
        failureRedirect: "/api/v2/auth/login",
        failureFlash: true,
    });
}