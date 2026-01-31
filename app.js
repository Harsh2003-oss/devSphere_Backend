require("dotenv").config();//Load environment variables
const connectDB = require('./config/db')
connectDB();
const express = require('express');
const User = require("./models/User");
const authRouter = require('./routes/auth')
const profileRouter = require("./routes/profile")
const requestRouter = require('./routes/requests')
const app = express();





app.use(express.json())

app.use("/api",authRouter);
app.use('/api',profileRouter);
app.use('/api',requestRouter);

app.get('/user', async (req,res) => {
    
  const userEmail = req.body.email;

    try {
        const user = await User.findOne({email:userEmail})
        res.send(user)
        console.log(user)
    } catch (error) {
        res.send(error.message)
    }


})

app.patch('/user/:id',async (req,res) => {
   const userId = req.params.id;
   const {firstName} = req.body;

   try {
    const user = await User.findByIdAndUpdate(userId,{
        firstName:firstName,
    //   new:true
    })

    res.send(user)
   } catch (error) {
    res.send(error.message)
   }


})


app.get('/feed', async (req,res) => {

 
    try{
   const user = await User.find({})
   res.send(user)

    }
    catch (error) {
        res.send(error.message)
    }
})


app.listen(3000,()=>{
    console.log('server running successfully')
})