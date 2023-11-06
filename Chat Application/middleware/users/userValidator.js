// Dependencies
const { check, validationResult } = require("express-validator");
const { unlink } = require("fs");
const path = require("path");
const createError = require("http-errors");

//Schema models imports
const User = require("../../models/UserModel");

// add user
const addUserValidator = [
  check("name")
    .isLength({ min: 1 })
    .withMessage("Name is required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Name must not contain other than alphabet")
    .trim(), //which method modify is called sanitization

  check("email")
    .isEmail()
    .withMessage("Invalid email address")
    .trim()
    .custom(async (value) => {
      try {
        const user = await User.findOne({ email: value });
        if (user) {
          throw createError("Email already is use");
        }
      } catch (error) {
        throw createError(error.message);
      }
    }),
  check("mobile")
    .isMobilePhone("bn-BD", {
      strictMode: true,
    })
    .withMessage("Mobile number must be bangladeshi")
    .custom(async (value) => {
      try {
        const user = await User.findOne({ mobile: value });
        if (user) {
          throw createError("Mobile already is use!");
        }
      } catch (error) {
        throw createError(error.message);
      }
    }),

  check("password")
    .isStrongPassword()
    .withMessage(
      "Password must be at least 8 characters long & should contain at least 1 lowecase, 1 uppercase, 1 number & 1 symbol"
    ),
];

// above middleware gives a result that we can receive into another function

const addUserValidatorHandler = function (req, res, next) {
  console.log("array of validation per korche");
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    console.log("kono error hoini clinet side a tai controller a jabe");
    next();
  } else {
    console.log("error hoice client side tai unlink korbe");
    // remove uploaded files
    if (req.files.length > 0) {
      const { filename } = req.files[0];
      unlink(
        path.join(__dirname, `/../../public/uploads/avatars/${filename}`),
        (err) => {
          if (err) console.log("Error while unlink: ", err);
        }
      );
    }
    // response the errors
    res.status(500).json({ errors: mappedErrors });
  }
};

module.exports = {
  addUserValidator,
  addUserValidatorHandler,
};
