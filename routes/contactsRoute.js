const {Router} = require('express')
const router = Router()

router.post('/api/auth/contacts')
router.get('/api/auth/contact')
router.get('/api/auth/contact/:id')
router.put('/api/auth/contact/:id')
router.delete('/api/auth/contact/:id')