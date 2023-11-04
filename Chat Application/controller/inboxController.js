// GET INBOX PAGE
const getInboxPage = (req, res, next) => {
  res.render("inbox");
};

module.exports = {
  getInboxPage,
};
