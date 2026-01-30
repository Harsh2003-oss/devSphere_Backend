const User = require('../models/User')
var jwt = require('jsonwebtoken');

const userAuth = async (req,res,next) => {
    try {
        const {token} = req.body;
        if(!token){
            throw new Error("Token is invalid")
        }

        const decodedObj = await jwt.verify(token, "SecretToken")

        const {_id} = decodedObj;

        const user = await User.findById(_id);
        if(!user){
            throw new Error("User not found");
        }
        next();

    } catch (error) {
          res.status(400).send("ERROR: "+ error.message)
    }
}

module.exports = {userAuth};