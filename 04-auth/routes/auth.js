const express = require("express");
const router = express.Router();
const Joi = require("@hapi/joi");
const userModel = require("../model/userModel");

const userAuthController = require("../contollers/userAuthController");

const validateRegister = async (req, res, next) => {
  const validationRules = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  const validResult = validationRules.validate(req.body);
  if (validResult.error) {
    return res.status(400).json(validResult.error);
  }

  const user = await userModel.findOne({ email: req.body.email });

  if (user) {
    return res.status(409).json({ message: "Email in use" });
  }

  next();
};

router.post("/register", validateRegister, userAuthController.signUp);
router.post("/login");
router.post("/logout");

module.exports = router;
