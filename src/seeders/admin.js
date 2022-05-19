const Users = require('../models/Users')
const bcrypt = require('bcrypt')
require('dotenv').config()
const {ADMIN_PASSWORD} = process.env

exports.seedAdmin = () => {
    // check if an admin exist
    Users.findOne({role: "admin"}, (err,existingAdmin) => {
        if (err) throw err
        if(existingAdmin) return "Admin already exists"

        // create and seed an admin
        Users.create({
            firstName: "Admin",
            lastName: "User",
            email: "Admin@Admin.com",
            role: "admin"
        }, (err, newAdmin) => {
            if(err) throw err
            // hash the password
            bcrypt.genSalt(10,(err, salt) => {
                if(err) throw err
                
                bcrypt.hash(ADMIN_PASSWORD, salt, (err, hashedPassword) => {
                    if (err) throw err
                    // save the password to the database
                    newAdmin.password = hashedPassword
                    newAdmin.save((err, savedAdmin) => {
                        if (err) throw err
                        return "Admin created"
                })
            })
        })
    })
})
}
