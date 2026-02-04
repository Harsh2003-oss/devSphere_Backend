const express = require('express')
const userRouter = express.Router();

const {userAuth }= require('../middlewares/auth')
const ConnectionRequest = require('../models/connectionRequest')

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

module.exports = userRouter;