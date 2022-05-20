const Contact = require('../models/Contacts')
const Users = require('../models/Users')

// Allows admin view all contacts
exports.getAllAdminContact = async (req, res) => {
    try {
        const getAllContact = await Contact.find({})

        if (getAllContact) {
            res.send({
                message: "All Contacts",
                contact: getAllContact
            })
            res.status(200)
        }
    } catch (err) {
        res.send({
            message: "Error",
            err
        })
        res.status(500)
    }
}

// Gets all Users
exports.getAllUsers = (req, res) => {
    try {
        const getAllUser = await Users.find({})

        if (!getAllUser) {
            res.send({
                message: "No user found"
            })
            res.status(404)
        }

        res.send({
            message: "Users found",
            User: getAllUser
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

// Gets User with id
exports.getOneUser = async (req, res) => {
    try {
        const getOneUser = await Users.findOne({
            email: req.params.email
        })

        if (!getOneUser) {
            res.send({
                message: "User with id doesn't exist"
            })
            res.status(404)
        }

        res.send({
            message: "User found",
            User: getOneUser
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

// Updates User from db
exports.updateUser = async (req, res) => {
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
            res.send({
                message: "User not found, err"
            })
            res.status(404)
        }
        res.send({
            message: "User update successful",
            contact: updatedUser
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

// Deletes contact from db
exports.deleteUser = async (req, res) => {
    try {
        const deleteOneUser = await Users.findOneAndDelete({
            email: req.params.email
        })
        if (!deleteOneUser) {
            res.send({
                message: "User not found, err"
            })
            res.status(404)
        }
        res.send({
            message: "User deletion successful"
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