//import model
const users = require("../models/modelcollection")


//logic for register
const register=(req,res)=>{ //body={acno:123,uname="anu",psw:"abc123"}
    //access data from body
    const acno=req.body.acno
    const uname=req.body.uname
    const psw=req.body.psw
    //check acno is present in users collection
    users.findOne({acno}).then(user=>{//user contain value of findOne
        if(user){
            res.status(401).send("user already exist")//.status(401)
        }
        else{
            //register user -create a new object for user
            var newUser=new users({
                acno,
                uname,
                psw,                 //keys should match what you given in model
                balance:0,
                transactions:[]
            })
            //save the object in collection
            newUser.save()
            //response send //json() - convert data into json type and send
            res.status(200).json(newUser)//.status(200)
        }
    })
    // res.send("register working")
}
//logic for login
const login=(req,res)=>{ //body={acno:1000,psw:}
    const {acno,psw}=req.body
    users.findOne({acno,psw}).then(user=>{
        if(user){
            res.status(200).json(user)
        }
        else{
            res.status(401).json("incorrect account number or password")
        }
    })
}
module.exports={
    register,login
}
