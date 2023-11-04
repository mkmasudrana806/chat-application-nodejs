// Dependencies
const express = require("express");
const router = express.Router();

// users controller
const { getUser } = require("../controller/userController");
const { dynamicAppTitle } = require("../middleware/common/dynamicTitle");

// LOGIN A USER
router.get("/", dynamicAppTitle("Users"), getUser);

module.exports = router;
