const {Router} = require('express')
const router = Router()
const Contact = require('../models/Contacts')
const contactController = require('../controllers/contactController')
const {authUser, checkIsAdmin} = require('../middleware/authentication')

router.post('/api/contact', authUser, contactController.createContact)
router.get('/api/contact', authUser, contactController.getAllContact)
router.get('/api/contact/:id', authUser, contactController.getOneContact)
router.put('/api/contact/:id', authUser, contactController.updateContact)
router.delete('/api/contact/:id', authUser, contactController.deleteContact)

// For admin User only
router.get('/api/admin/contact', authUser, checkIsAdmin, contactController.getAllAdminContact)

module.exports = router