const Joi = require("@hapi/joi");
const bcrypt = require("bcrypt");
const userModel = require("../model/userModel");

const validateRegister = async (req, res, next) => {
  const validationRules = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
    subscription: Joi.string(),
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

const validateLogin = async (req, res, next) => {
  const validationRules = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });

  const validResult = validationRules.validate(req.body);
  if (validResult.error) {
    return res.status(400).json(validResult.error);
  }

  next();
};

module.exports = {
  validateRegister,
  validateLogin,
};
