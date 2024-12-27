
const express = require('express')
const { getUserController, UpdateUserDetails, resetPasswordController, updatePasswordController, deleteUserCotroller } = require('../controllers/userControllers')
const authMiddleware = require('../middlewares/authMiddleware')

//router object
const router = express.Router()
router.get('/getallusers', authMiddleware, getUserController)
router.put('/updateuser', authMiddleware, UpdateUserDetails)
router.post('/resetpassword', authMiddleware, resetPasswordController)
router.post('/updatepassword', authMiddleware, updatePasswordController)
router.delete('/deleteuser/:id', authMiddleware, deleteUserCotroller)

//export
module.exports = router






