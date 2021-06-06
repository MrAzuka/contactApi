const {Router} = require('express')
const router = Router()
const adminController = require('../controllers/adminController')
const {authUser, checkIsAdmin} = require('../middleware/authentication')

// For admin User only
router.get('/api/admin/contact', authUser, checkIsAdmin, adminController.getAllAdminContact)

router.get('/api/admin/user', authUser, checkIsAdmin, adminController.getAllUsers)
router.get('/api/admin/user/:id', authUser, checkIsAdmin, adminController.getOneUser)
router.put('/api/admin/user/:id', authUser, checkIsAdmin, adminController.updateUser)
router.delete('/api/admin/user/:id', authUser, checkIsAdmin, adminController.deleteUser)

module.exports = router