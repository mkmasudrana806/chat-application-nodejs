//Dependencies
const express = require("express");
const connectDatabase = require("./connection");
const app = express();
require("dotenv").config();
const path = require("path");
const cookieParser = require("cookie-parser");

// external methods
const { notFoundHandler, errorHandler } = require("./error handling/error");

// routes middleware
const usersRoutes = require("./routes/usersRoutes");
const inboxRoutes = require("./routes/inboxRoutes");
const loginPageRoutes = require("./routes/loginPageRoutes");

// database connection
connectDatabase(process.env.MONGO_CONNECTION_STRING);

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser(process.env.COOKIE_SECRET));
// set view engine
app.set("view engine", "ejs");

// application routes
app.use("/", loginPageRoutes);
app.use("/users", usersRoutes);
app.use("/inbox", inboxRoutes);

// when no route is specified, this middleware will run.
// 404 not found error handler
app.use(notFoundHandler);

// error handler
app.use(errorHandler);

// start the server
app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});
