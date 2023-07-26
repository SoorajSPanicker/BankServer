const express=require('express')
const logic=require('../controllers/logic')
//Create an object for Router class in express
const router=new express.Router()
//register
router.post('/bankuser/user-register',logic.register)
//login
router.post('/bankuser/user-login',logic.login)
//user profile
router.get('/bankuser/user-profile/:acno',logic.getProfile)
//balance enquiry
router.get('/bankuser/bal-enquiry/:acno',logic.getBalance)
//export router
module.exports=router
