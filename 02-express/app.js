const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/contacts");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/contacts", contactsRouter);

// error handler
app.use(function (err, req, res, next) {
  console.log(err);
  res.status(err.status || 500);
  res.send(err);
});

module.exports = app;
