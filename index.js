//import express
const express=require('express')
//import env file
require('dotenv').config()
//import cors
const cors=require('cors')
// const router = require('./routes/userRouting')
//import db connection
require('./db/dbconnection')
//import router
const router=require('./routes/userRouting')
//create server using express
const server=express()
//connect with frontend
server.use(cors())
//to convert all incoming json datas into js
server.use(express.json())
server.use(router)


// server.get('/getpath/usernew',(req,res)=>{
//     res.send("get request response...")
// })
// server.get('/getpath/lastuser',(req,res)=>{
//     res.send("get request response 2...")
// })


//port set
const port=3000 || process.env.port

//running config
server.listen(port,()=>{
    console.log(`_____ Server started at port number ${port}________`);
})
