const express = require('express')
const authRouter = express.Router();
const User = require('../models/User')
const {validateSignUpData} = require('../utils/valdation')

authRouter.post("/signup", validateSignUpData, async (req, res) => {
  try {
    const { password } = req.body;

    const hashedPassword = await User.hashPassword(password);

    const user = new User({
      ...req.body,
      password: hashedPassword
    });

    await user.save();

    res.status(201).send("User created successfully");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

authRouter.post('/login',async(req,res,next)=>{
   try {
        const {email,password} = req.body;

        if(!email || !password){
            return res.status(400).json({error:"Please fill all the fields"})
        }

        const user = await User.findOne({email:email});

        if(!user){
            return res.status(400).json({error:"User does not exist"})
        }

        const isValidPassword = await user.isValidPassword(password);

        if(!isValidPassword){
            return res.status(400).json({error:"Invalid credentials"})
        }

        const token = user.generateJWT();
        delete user._doc.password;

        res.json({
            message:"User logged in successfully",
            user,
            token
        })

    } catch (error) {
        res.status(400).json({error:error.message })
    }
})


   
module.exports = authRouter;
