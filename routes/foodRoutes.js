
const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { createFoodController, getAllFoods, getByIdFood, getFoodRestaruntById, updateFoodController, deleteFoodController, plcaeOrderCnontroller, oderStatusController, } = require('../controllers/FoodControllers')
const adminMiddleware = require('../middlewares/adminMiddleware')

//router object
const router = express.Router()
router.post('/createfood', authMiddleware, createFoodController)
router.get('/getallfoods', authMiddleware, getAllFoods)
router.get('/getByIdFood/:id', authMiddleware, getByIdFood)
router.get('/getRestaruntById/:id', authMiddleware, getFoodRestaruntById)
router.put('/updatefoodcontroller/:id', authMiddleware, updateFoodController)
router.delete('/deletefooditem/:id', authMiddleware, deleteFoodController)
router.post('/placeorder', authMiddleware, plcaeOrderCnontroller)

router.post('/oderstatus/:id', authMiddleware, adminMiddleware, oderStatusController)


//export
module.exports = router