const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const contactsRouter = require("./routes/contacts");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/contacts", contactsRouter);

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
