const {Router} = require('express')
const router = Router()
const Contact = require('../models/Contacts')
const contactController = require('../controllers/contactController')

router.post('/api/contact', contactController.createContact)
router.get('/api/contact', contactController.getAllContact)
router.get('/api/contact/:id', contactController.getOneContact)
router.put('/api/contact/:id', contactController.updateContact)
router.delete('/api/contact/:id', contactController.deleteContact)


module.exports = router