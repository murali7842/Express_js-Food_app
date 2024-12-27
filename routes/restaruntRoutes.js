
const express = require('express')
const authMiddleware = require('../middlewares/authMiddleware')
const { createRestaruntController, getAllRestaruntsController, restaruntGetById, delecteRestarunt } = require('../controllers/restaruntControllers')

//router object
const router = express.Router()
router.post('/createrestarunt',authMiddleware,createRestaruntController)
router.get('/getallrestarunt',authMiddleware,getAllRestaruntsController)
router.get('/restaruntgetById/:id',authMiddleware,restaruntGetById)
router.delete('/deleterestarunt/:id',authMiddleware,delecteRestarunt)




//export
module.exports = router






