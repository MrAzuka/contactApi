const Contact = require('../models/Contacts')

// Creates contacts
exports.createContact = async (req, res) => {
    try {
        const createNewContact = await Contact.create({
            user: req.token.id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            mobile: req.body.mobile,
            gender: req.body.gender
        })

        res.send({
            message: "New contact created",
            contact: createNewContact
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

// Gets all contacts
exports.getAllContact = async (req, res) => {
    try {
        const findAllContact = await Contact.find({
            user: req.token.id
        })

        res.send({
            message: "All Contacts",
            contact: findAllContact
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

// Gets contact with id
exports.getOneContact = async (req, res) => {
    try {
        const findOneContact = await Contact.findById(req.params.id)

        if (req.params.id != findOneContact) {
            res.send({
                message: "Contact not found"
            })
            res.status(404)
        }

        res.send({
            message: "Contact Found",
            contact: findOneContact
        })
    } catch (err) {
        res.send({
            message: "Error",
            err
        })
        res.status(500)
    }
}

// Updates contact from db
exports.updateContact = async (req, res) => {
    try {
        const updateOneContact = await Contact.findByIdAndUpdate(req.params.id, {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            mobile: req.body.mobile,
            gender: req.body.gender
        })

        if (req.params.id != updateOneContact) {
            res.send({
                message: "Contact not found, err"
            })
            res.status(404)
        }

        res.send({
            message: "Contact update successful",
            contact: updateOneContact
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
exports.deleteContact = async (req, res) => {
    try {
        const deleteOneContact = await Contact.findByIdAndDelete(req.params.id)
        if (req.params.id != deleteOneContact) {
            res.send({
                message: "Contact not found, err"
            })
            res.status(404)
        }
        res.send({
            message: "Contact deletion successful"
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