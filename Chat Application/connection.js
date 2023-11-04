const mongoose = require("mongoose");

// mongodb connection
const connectDatabase = async (url) => {
  mongoose
    .connect(url)
    .then(() => console.log("Database Connected"))
    .catch(() => console.log("Faild to connect to Mongo"));
};

module.exports = connectDatabase;
