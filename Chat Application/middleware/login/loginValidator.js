// external dependencies
const { check, validationResult } = require("express-validator");

// login validator middleware
const loginValidator = [
  check("username")
    .isLength({
      min: 1,
    })
    .withMessage("Mobible number or email is required"),
  check("password")
    .isLength({
      min: 1,
    })
    .withMessage("Password is required"),
];

// catch the error after using above middleware validation
const loginValidationHandler = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    res.render("index", {
      data: {
        username: req.body.username,
      },
      errors: mappedErrors,
    });
  }
};
// exports the module
module.exports = {
  loginValidator,
  loginValidationHandler,
};
