// external dependencies
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// GENERATE OR CREATE A TOKEN
const createToken = (user) => {
  const token = jwt.sign(user, process.env.TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRY,
  });
  if (token) {
    return token;
  }
};

// VERIFY A TOKEN

// exports the method
module.exports = {
  createToken,
};
