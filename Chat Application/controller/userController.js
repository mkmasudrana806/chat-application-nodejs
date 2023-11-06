// External dependencies
const bcrypt = require("bcrypt");
const User = require("../models/UserModel");
const path = require("path");
const { unlink } = require("fs");

// GET USER PAGE AND LOAD ALL THE USERS
const getUser = async (req, res, next) => {
  console.log("api hit to get user");
  try {
    const users = await User.find();
    res.render("users", {
      users: users,
    });
  } catch (error) {
    next(error);
  }
};

// ADD USER
const addUser = async (req, res, next) => {
  let newUser;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  if (req.files && req.files.length > 0) {
    newUser = new User({
      ...req.body,
      avatar: req.files[0].filename,
      password: hashedPassword,
    });
  } else {
    newUser = new User({
      ...req.body,
      password: hashedPassword,
    });
  }

  // save user or send erros messages
  try {
    const result = await newUser.save();
    res.status(200).json("User created successfully");
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Unkown error occured",
        },
      },
    });
  }
};

// DELETE A USER
const removeUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete({ _id: req.params.id });
    // remove avatar if exists
    if (user.avatar) {
      // call unlink
      unlink(
        path.join(__dirname, `/../public/uploads/avatars/${user.avatar}`),
        (err) => {
          if (err) console.log("Error while unlink: ", err);
        }
      );
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          msg: "could not delete the user",
        },
      },
    });
  }
};

module.exports = {
  getUser,
  addUser,
  removeUser,
};
