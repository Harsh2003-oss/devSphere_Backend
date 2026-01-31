
const bcrypt = require('bcrypt');
const User = require('../models/User')

const validator = require('validator');

const validateSignUpData = (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName) {
    return res.status(400).send("Name is not valid");
  }

  if (!validator.isEmail(email)) {
    return res.status(400).send("Email not valid");
  }

  if (!password || password.length < 6) {
    return res.status(400).send("Password too short");
  }

  next();
};



module.exports = {validateSignUpData}