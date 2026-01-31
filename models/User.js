const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 

const userSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { 
        type: String, 
        unique: true, // Recommended for authentication
        required: true 
    },
    password: { type: String, required: true },
    age: { type: Number },
    gender: { type: String }
});

userSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
};

userSchema.methods.isValidPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateJWT = function() {
    return jwt.sign(
        { userId: this._id, email: this.email }, 
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
};

module.exports = mongoose.model("User", userSchema);
