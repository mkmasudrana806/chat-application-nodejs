// external dependencies
const bcrypt = require("bcrypt");
const createError = require("http-errors");
const { response } = require("express");

// internal emports
const User = require("../models/UserModel");
const { createToken } = require("./token");

// GET LOGIN PAGE
const getLoginPage = (req, res, next) => {
  res.render("index");
};

// DO LOGIN A USER
const login = async (req, res, next) => {
  console.log("come to the login page");
  try {
    // find a user who has this email/username
    const user = await User.findOne({
      $or: [{ email: req.body.username }, { mobile: req.body.username }],
    });
    if (user && user._id) {
      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (isPasswordValid) {
        // prepare the uesr object for the token
        const userObject = {
          username: user.name,
          mobile: user.mobile,
          email: user.email,
          role: "user",
        };
        // generate a token for the user
        const token = createToken(userObject);

        // set cookie for the token
        res.cookie(process.env.COOKIE_NAME, token, {
          maxAge: process.env.TOKEN_EXPIRY,
          httpOnly: true,
          signed: true,
        });

        // set user locals
        res.locals.loggedInUser = userObject;
        res.render("inbox");
      } else {
        // password is not valid
        throw createError("Login failed! please try again");
      }
    } else {
      throw createError("Login failed! please try again");
    }
  } catch (error) {
    res.render("index", {
      data: {
        username: req.body.username,
      },
      errors: {
        common: {
          msg: error.message,
        },
      },
    });
  }
};

// LOGOUT USER
const logout = (req, res) => {
  res.clearCookie(process.env.COOKIE_NAME);
  res.send("logged out");
};
module.exports = {
  getLoginPage,
  login,
  logout,
};
