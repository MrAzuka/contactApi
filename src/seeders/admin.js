const Users = require('../models/Users')
const bcrypt = require('bcrypt')
require('dotenv').config()
const { ADMIN_PASSWORD } = process.env

exports.seedAdmin = async () => {
    try {
        const checkForAdmin = await Users.findOne({ role: "admin" })
        if (checkForAdmin) {
            return "Admin already exists"
        }

        // hash the password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, salt)

        const createAdmin = await Users.create({
            firstName: "Admin",
            lastName: "User",
            email: "Admin@Admin.com",
            role: "admin",
            password: hashedPassword
        })
        if (createAdmin) return "Admin Created Successfully"

    } catch (err) {
        return "Error creating Admin"
    }
}
