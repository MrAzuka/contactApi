const Users = require('../models/Users')
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


exports.signupUser = async (req, res) => {

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
        res.send({
            message: "Error",
            err
        })
        res.status(500)
    }

}

exports.loginUser = async (req, res) => {
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

        res.send({
            message: "Login Successful",
            Token: token
        })
        res.status(200)

    } catch (err) {
        res.send({
            message: "Error",
            err
        })
        res.status(500)
    }
}