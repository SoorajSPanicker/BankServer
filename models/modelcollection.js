const mongoose=require('mongoose')

//create model for collections

//users
const users=new mongoose.model("users",{
    acno:Number,
    uname:String,
    psw:String,
    balance:Number,
    transactions:[]
})
module.exports=users