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
//logic to get profile datas
const getProfile=(req,res)=>{
    //access acno param from url req
    const {acno}=req.params
    users.findOne({acno}).then(user=>{
        if(user){
            res.status(200).json({
                acno:user.acno,
                uname:user.uname
            })

        }
        else{
            res.status(401).json("user not exist")
        }
    })
}
//logic to get balance
const getBalance=(req,res)=>{
    const{acno}=req.params
    users.findOne({acno}).then(user=>{
        if(user){
            res.status(200).json({  //sharing object using json method
                acno:user.acno,
                uname:user.uname,
                balance:user.balance
            })
        }
        else{
            res.status(401).json("user not exist")
        }
    })
}
//logic for money transfer
const moneyTransfer=(req,res)=>{
    //access all datas from body
    const {fromAcno,toAcno,psw,amount,date}=req.body
    //covert string amount to number
    var amnt=parseInt(amount)
    //check from user in db
    users.findOne({acno:fromAcno,psw}).then(fromUser=>{
        if(fromUser){
            //check for toUser
            users.findOne({acno:toAcno}).then(toUser=>{
                if(toUser){
                    //from balance check
                    if(amnt<=fromUser.balance){
                        fromUser.balance-=amnt
                        fromUser.transactions.push({type:"DEBIT",amount:amnt,date,user:toUser.uname})
                        fromUser.save()

                        toUser.balance+=amnt
                        toUser.transactions.push({type:"CREDIT",amount:amnt,date,user:fromUser.uname})
                        toUser.save()

                        res.status(200).json({message:"transaction success"})

                    }
                    else{
                        res.status(401).json({message:"insufficient balance"})
                    }

                }
                else{
                    res.status(401).json({message:"Invalid credit credentials"})
                }
            })

        }
        else{
            res.status(401).json({message:"Invalid debit credentials"})
        }
    })
}
//logic to transaction history
const history=(req,res)=>{
    const {acno}=req.params
    users.findOne({acno}).then(user=>{
        if(user){
            res.status(200).json(user.transactions)

        }
        else{
            res.status(401).json("user not exist")
        }
    })
}

//logic to delete account
const deleteAc=(req,res)=>{
    const{acno}=req.params
    users.deleteOne({acno}).then(user=>{ //deleteCount=0/1
        if(user){
            res.status(200).json("Account Deleted Successfully")

        }
        else{
            res.status(401).json("user not exist")
            
        }
    })
}



module.exports={
    register,login,getProfile,getBalance,moneyTransfer,history,deleteAc
}
