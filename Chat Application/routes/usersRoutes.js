// External Dependencies
const express = require("express");
const router = express.Router();
const {
  getUser,
  addUser,
  removeUser,
} = require("../controller/userController");
const { dynamicAppTitle } = require("../middleware/common/dynamicTitle");
const avatarUpload = require("../middleware/users/avatarUpload");
const {
  addUserValidator,
  addUserValidatorHandler,
} = require("../middleware/users/userValidator");

// LOGIN PAGE
router.get("/", dynamicAppTitle("Users"), getUser);

//  ADD A USER
router.post(
  "/",
  avatarUpload,
  addUserValidator,
  addUserValidatorHandler,
  addUser
);

// DELETE A USER
router.delete("/:id", removeUser);
module.exports = router;
