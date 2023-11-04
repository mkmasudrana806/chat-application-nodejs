const express = require("express");
const router = express.Router();

const { getInboxPage } = require("../controller/inboxController");
const { dynamicAppTitle } = require("../middleware/common/dynamicTitle");

// get inbox page
router.get("/", dynamicAppTitle("Inbox"), getInboxPage);

module.exports = router;
