const express = require("express");
const {
  getLoginPage,
  login,
  logout,
} = require("../controller/loginPageController");
const { dynamicAppTitle } = require("../middleware/common/dynamicTitle");
const {
  loginValidator,
  loginValidationHandler,
} = require("../middleware/login/loginValidator");
const { redirectLoggedIn } = require("../middleware/common/checkLogin");
const router = express.Router();

// GET LOGIN PAGE
router.get("/", dynamicAppTitle("Login"), redirectLoggedIn, getLoginPage);

// POST A LOGIN USER
router.post(
  "/",
  dynamicAppTitle("Login"),
  loginValidator,
  loginValidationHandler,
  login
);

// LOGOUT USER
router.delete("/", logout);

module.exports = router;
