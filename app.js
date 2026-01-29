require("dotenv").config();//Load environment variables
const connectDB = require('./config/db')
connectDB();

const express = require('express');

const app = express();




app.use('/',(req,res,next) => {
    const token = 'xyz';
    const authorized = token ;
    if(authorized === token){
        res.send("aithorized")

    }else{
        next();
    }
})

app.get('/admin/getUser',(req,res) => {
    res.send("Got all data")
})

app.get('/admin/deleteUser', (req,res) =>{
    res.send("deleted user")
})

app.listen(3000,()=>{
    console.log('server running successfully')
})