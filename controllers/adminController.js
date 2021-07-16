const Contact = require('../models/Contacts')
const Users = require('../models/Users')

// Allows admin view all contacts
exports.getAllAdminContact = (req,res) => {
    Contact.find({},
    (err, allContact) => {
        if(!err){
         res.send({
             message: "All Contacts",
             contact: allContact
        })
         res.status(200)
        }else{
         res.send({message: "Error", err})
         res.status(500)
        }
    })
}

// Gets all Users
exports.getAllUsers = (req,res) => {
    Users.find({},
    (err, allUsers) => {
        if(!err){
         res.send({
             message: "All Users",
             contact: allUsers
        })
         res.status(200)
        }else{
         res.send({message: "Error", err})
         res.status(500)
        }
    })
}

// Gets User with id
exports.getOneUser = (req,res) => {
    Users.findOne({email: req.params.email},
    (err, foundUser) => {
        if(!err){
         res.send({
             message: "User Found",
             User: foundUser
        })
         res.status(200)
        }else if(req.params.id != foundUser){
            res.send({message: "User not found"})
            res.status(404)
        }else{
         res.send({message: "Error", err})
         res.status(500)
        }
    })
}

// Updates User from db
exports.updateUser = (req,res) => {
    Users.findOneAndUpdate({email: req.params.email}, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
    
    },  (err, updatedUser) => {
        if(!err){
         res.send({
             message: "User update successful",
             contact: updatedUser
        })
         res.status(200)
        }else if(email != updatedUser){
            res.send({message: "User not found, err"})
            res.status(404)
        }else{
         res.send({message: "Error", err})
         res.status(500)
        }
    })
}

// Deletes contact from db
exports.deleteUser = (req,res) => {
    Users.findOneAndDelete({email: req.params.email}, 
        (err, deletedUser) => {
            if(!err){
             res.send({
                 message: "User deletion successful"
            })
             res.status(200)
            }else if(email != deletedUser){
                res.send({message: "User not found, err"})
                res.status(404)
            }else{
             res.send({message: "Error", err})
             res.status(500)
            }
        })
}
