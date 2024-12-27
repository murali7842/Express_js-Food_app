
const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { createCategory, getAllCategorys, updateCategory, deleteCategory } = require('../controllers/categoryController')

//router object
const router = express.Router()
router.post('/createcategory',authMiddleware,createCategory)
router.get('/getallcategorys',authMiddleware,getAllCategorys)
router.put('/updatecategory/:id',authMiddleware,updateCategory)
router.delete('/deletecategory/:id',authMiddleware,deleteCategory)


//export
module.exports = router






