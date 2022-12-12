const Contact = require('../models/contact_Model')

// Creates contacts
export const createContact = async (req, res) => {
    try {
        // Check if mobile number already exists
        const checkMobile = await Contact.findOne({ user: req.token.id, mobile: req.body.mobile })
        if (checkMobile) {
            res.status(401).json({
                message: "Phone number already exists"
            })
        }
        const createNewContact = await Contact.create({
            user: req.token.id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            mobile: req.body.mobile,
            gender: req.body.gender
        })

        res.status(200).json({
            message: "New contact created",
            contact: createNewContact
        })

    } catch (err) {
        res.status(500).json({
            message: "Error",
            err
        })
    }
}

// Gets all contacts
export const getAllContact = async (req, res) => {
    try {
        const findAllContact = await Contact.find({
            user: req.token.id
        })

        res.status(200).json({
            message: "All Contacts",
            contact: findAllContact
        })
    } catch (err) {
        res.status(400).json({
            message: "Error",
            err
        })
    }
}

// Gets contact with id
export const getOneContact = async (req, res) => {
    try {
        const findOneContact = await Contact.findById(req.params.id)

        if (req.params.id != findOneContact) {
            res.status(404).json({
                message: "Contact not found"
            })
        }
        res.status(200).json({
            message: "Contact Found",
            contact: findOneContact
        })
    } catch (err) {
        res.status(400).json({
            message: "Error",
            err
        })
    }
}

// Updates contact from db
export const updateContact = async (req, res) => {
    try {
        const updateOneContact = await Contact.findByIdAndUpdate(req.params.id, {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            mobile: req.body.mobile,
            gender: req.body.gender
        })

        if (req.params.id != updateOneContact) {
            res.status(404).json({
                message: "Contact not found, err"
            })
        }

        res.status(200).json({
            message: "Contact update successful",
            contact: updateOneContact
        })
    } catch (err) {
        res.status(400).json({
            message: "Error",
            err
        })
    }
}

// Deletes contact from db
export const deleteContact = async (req, res) => {
    try {
        const deleteOneContact = await Contact.findByIdAndDelete(req.params.id)
        if (req.params.id != deleteOneContact) {
            res.status(404).json({
                message: "Contact not found, err"
            })
        }
        res.status(200).json({
            message: "Contact deletion successful"
        })
    } catch (err) {
        res.status(400).json({
            message: "Error",
            err
        })
    }
}