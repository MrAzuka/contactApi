const Contact = require('../models/contact_Model')
const Users = require('../models/user_Model')

// Allows admin view all contacts
export const getAllAdminContact = async (req, res) => {
    try {
        const getAllContact = await Contact.find({})

        if (getAllContact) {
            res.status(200).json({
                message: "All Contacts",
                contact: getAllContact
            })
        }
    } catch (err) {
        res.status(400).json({
            message: "Error",
            err
        })
    }
}

// Gets all Users
export const getAllUsers = async (req, res) => {
    try {
        const getAllUser = await Users.find({})

        if (!getAllUser) {
            res.status(404).json({
                message: "No user found"
            })
        }

        res.status(200).json({
            message: "Users found",
            User: getAllUser
        })

    } catch (err) {
        res.status(400).json({
            message: "Error",
            err
        })
    }
}

// Gets User with id
export const getOneUser = async (req, res) => {
    try {
        const getOneUser = await Users.findOne({
            email: req.params.email
        })

        if (!getOneUser) {
            res.status(404).json({
                message: "User with id doesn't exist"
            })
        }

        res.status(200).json({
            message: "User found",
            User: getOneUser
        })

    } catch (err) {
        res.status(400).json({
            message: "Error",
            err
        })
    }
}

// Updates User from db
export const updateUser = async (req, res) => {
    try {
        const updateOneUser = await Users.findOneAndUpdate({
            email: req.params.email
        }, {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,

        })
        if (!updateOneUser) {
            res.status(404).json({
                message: "User not found, err"
            })
        }
        res.status(200).json({
            message: "User update successful",
            contact: updateOneUser
        })
    } catch (err) {
        res.status(500).json({
            message: "Error",
            err
        })
    }
}

// Deletes contact from db
export const deleteUser = async (req, res) => {
    try {
        const deleteOneUser = await Users.findOneAndDelete({
            email: req.params.email
        })
        if (!deleteOneUser) {
            res.status(404).json({
                message: "User not found, err"
            })
        }
        res.status(200).json({
            message: "User deletion successful"
        })
    } catch (err) {
        res.status(400).json({
            message: "Error",
            err
        })
    }
}