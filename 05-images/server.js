const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");

require("dotenv").config();
require("./passport").initializeStrategies();

// Router
const contactsRouter = require("./routes/contacts");
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");

const app = express();

app.use(express.static("public"));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

// Router
app.use("/contacts", contactsRouter);
app.use("/auth", authRouter);
app.use("/users", usersRouter);

// app.post('/auth/logout', (req, res) => {
//   req.logout();
//   res.json({
//     success: true,
//     status: 200,
//   });
// });

const initDataBase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL + process.env.DATA_BASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log('"Database connection successful"');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

initDataBase();

// error handler
app.use(function (err, req, res, next) {
  console.log(err);
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
