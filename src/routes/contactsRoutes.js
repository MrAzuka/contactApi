const {Router} = require('express')
const router = Router()
const {createContact, getAllContact, getOneContact, updateContact, deleteContact} = require('../controllers/contactController')
const {authUser} = require('../middleware/authentication')

// The "authUser" function authenticates if the user exists before accessing the app
// CRUD Api for contacts
router.post('/', authUser, createContact)
router.get('/', authUser, getAllContact)
router.get('/:id', authUser, getOneContact)
router.put('/:id', authUser, updateContact)
router.delete('/:id', authUser, deleteContact)


module.exports = router