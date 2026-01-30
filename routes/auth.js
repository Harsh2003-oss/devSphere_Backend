const express = require('express')

const router = express.Router();
const bcrypt = require('bcrypt')
const User = require('../models/User')
var jwt = require('jsonwebtoken');
const {validateLogin,validateSignUpData} = require('../utils/valdation')
const cookie = require('cookie')
var cookieParser = require('cookie-parser')

router.post("/signup",validateSignUpData, async (req,res)=>{

    const {password}= req.body;

    const hashedPassword = await bcrypt.hash(password,10)


    const user = new User({...req.body,password:hashedPassword})
console.log(user)
try {
    await user.save();
    res.send("Creatd success")
} catch (error) {
    res.send(error.message)
}
})

router.post("/login",validateLogin,async (req,res) =>{
    try {
        const {email,password} = req.body;

        const user = await User.findOne({email:email});

        if(!user){
            throw new Error ("Invalid credentials")
        }

        const isPasswordValid = await user.validatePassword(password);

        if(isPasswordValid){
            const token = await user.getJWT();
        

res.cookie("token",token,{
    expires:new Date(Date.now() + 8* 3600000),
});
res.send("Login Successfull!!")
        }else{
            throw new Error("Invalid Credentials")
        }
    }  
     catch (error) {
        res.status(400).send("ERROR: "+ error.message)
    }
})


module.exports = router;
