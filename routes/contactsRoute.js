const {Router} = require('express')
const router = Router()
const Contact = require('../models/Contacts')
const contactController = require('../controllers/contactController')
const {authUser} = require('../middleware/authentication')

router.post('/api/contact', authUser, contactController.createContact)
router.get('/api/contact', authUser, contactController.getAllContact)
router.get('/api/contact/:id', authUser, contactController.getOneContact)
router.put('/api/contact/:id', contactController.updateContact)
router.delete('/api/contact/:id', contactController.deleteContact)


module.exports = router