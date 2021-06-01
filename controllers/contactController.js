const Contact = require('../models/Contacts')


exports.createContact = (req,res) => {
    Contact.create({
        user: req.token.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        mobile: req.body.mobile,
        gender: req.body.gender
    }, (err, newContact) => {
        if(!err){
         res.send({
             message: "New contact created",
             contact: newContact
        })
         res.status(200)
        }else{
         res.send({message: "Error", err})
         res.status(500)
        }
    })
}

exports.getAllContact = (req,res) => {
    Contact.find({user: req.token.id},
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

exports.getOneContact = (req,res) => {
    Contact.findById(req.params.id,
    (err, foundContact) => {
        if(!err){
         res.send({
             message: "Contact Found",
             contact: foundContact
        })
         res.status(200)
        }else if(req.params.id != foundContact){
            res.send({message: "Contact not found"})
            res.status(404)
        }else{
         res.send({message: "Error", err})
         res.status(500)
        }
    })
}

exports.updateContact = (req,res) => {
    Contact.findByIdAndUpdate(req.params.id, {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        mobile: req.body.mobile,
        gender: req.body.gender
    },  (err, updatedContact) => {
        if(!err){
         res.send({
             message: "Contact update successful",
             contact: updatedContact
        })
         res.status(200)
        }else if(req.params.id != updatedContact){
            res.send({message: "Contact not found, err"})
            res.status(404)
        }else{
         res.send({message: "Error", err})
         res.status(500)
        }
    })
}

exports.deleteContact = (req,res) => {
    Contact.findByIdAndDelete(req.params.id, 
        (err, deletedContact) => {
            if(!err){
             res.send({
                 message: "Contact deletion successful"
            })
             res.status(200)
            }else if(req.params.id != deletedContact){
                res.send({message: "Contact not found, err"})
                res.status(404)
            }else{
             res.send({message: "Error", err})
             res.status(500)
            }
        })
}
