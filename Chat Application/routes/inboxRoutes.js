const express = require("express");
const router = express.Router();

const { getInboxPage } = require("../controller/inboxController");
const { dynamicAppTitle } = require("../middleware/common/dynamicTitle");
const { checkLogin } = require("../middleware/common/checkLogin");

// get inbox page
router.get("/", dynamicAppTitle("Inbox"), checkLogin, getInboxPage);

module.exports = router;
