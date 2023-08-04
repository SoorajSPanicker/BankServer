const express=require('express')
const logic=require('../controllers/logic')
//Create an object for Router class in express
const router=new express.Router()
//application specific middleware - true/false

//register
router.post('/bankuser/user-register',logic.register)
//login
router.post('/bankuser/user-login',logic.login)
//user profile
router.get('/bankuser/user-profile/:acno',logic.getProfile)
//balance enquiry
router.get('/bankuser/bal-enquiry/:acno',logic.getBalance)
//money transfer
router.post('/bankuser/money-transfer',logic.moneyTransfer)
//transaction history
router.get('/bankuser/user-history/:acno',logic.history)
//delete ac
router.delete('/bankuser/user-delete/:acno',logic.deleteAc)
//export router
module.exports=router

