const express = require("express");
const router = express.Router();

const usersController = require("../contollers/usersController");
const validate = require("../validate/validateAuth");

router.post("/current", validate.authorize, usersController.currentUser);

module.exports = router;
