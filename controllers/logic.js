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
            res.send("user already exist")//.status(401)
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
            res.json(newUser)//.status(200)
        }
    })
    // res.send("register working")
}
module.exports={
    register
}
