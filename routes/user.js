const express = require('express')
const userRouter = express.Router();

const {userAuth }= require('../middlewares/auth')
const ConnectionRequest = require('../models/connectionRequest')
const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills"

userRouter.get("/user/requests/received",userAuth,async (req,res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequests = await ConnectionRequest.find({
            toUserId : loggedInUser._id
        }).populate("fromUserId",["firstName","lastName" ])

        res.json({
            message:"Data fetched successfully",
            data:connectionRequests
        })

    } catch (error) {
          res.status(400).send(error.message)
    }
})

userRouter.get('/user/connections',userAuth , async (req,res) => {
    try {
        const loggedInUser = req.user;
    
        const connectionRequests = await ConnectionRequest.find({

            $or: [
                {toUserId:loggedInUser._id, status:"accepted"},
                {fromUserId:loggedInUser._id, status :"accepted"}
            ]
        })
        .populate("fromUserId", USER_SAFE_DATA)
        .populate("toUserId",USER_SAFE_DATA);

        console.log(connectionRequests)

        const data = connectionRequests.map((row)=>{
            if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
                return row.fromUserId;
            }else {
    return row.fromUserId;
  }
        })

       
    res.json({data})
      console.log(connectionRequests)

    
    } 

    catch (error) {
         res.status(400).send(error.message)
    }
})

module.exports = userRouter;