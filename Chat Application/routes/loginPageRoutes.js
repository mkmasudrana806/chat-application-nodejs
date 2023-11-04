const express = require("express");
const { getLoginPage } = require("../controller/loginPageController");
const { dynamicAppTitle } = require("../middleware/common/dynamicTitle");
const router = express.Router();

// LOGIN A USER
router.get("/", dynamicAppTitle("Login"), getLoginPage);

module.exports = router;
