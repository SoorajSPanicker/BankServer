const express=require('express')
const logic=require('../controllers/logic')
//Create an object for Router class in express
const router=new express.Router()
//register
router.post('/bankuser/user-register',logic.register)

//export router
module.exports=router
