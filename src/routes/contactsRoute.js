const {Router} = require('express')
const router = Router()
const {createContact, getAllContact, getOneContact, updateContact, deleteContact} = require('../controllers/contactController')
const {authUser} = require('../middleware/authentication')

// The "authUser" function authenticates if the user exists before accessing the app
// CRUD Api for contacts
router.post('/api/contact', authUser, createContact)
router.get('/api/contact', authUser, getAllContact)
router.get('/api/contact/:id', authUser, getOneContact)
router.put('/api/contact/:id', authUser, updateContact)
router.delete('/api/contact/:id', authUser, deleteContact)


module.exports = router