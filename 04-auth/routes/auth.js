const express = require("express");
const router = express.Router();

const userAuthController = require("../contollers/userAuthController");
const validate = require("../validate/validateAuth");

router.post("/register", validate.validateRegister, userAuthController.signUp);
router.post("/login", validate.validateLogin, userAuthController.login);
router.post("/logout");

module.exports = router;
