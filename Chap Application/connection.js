const mongoose = require("mongoose");

// mongodb connection
const connectDatabase = (url) => {
  return mongoose.connect(url);
};
