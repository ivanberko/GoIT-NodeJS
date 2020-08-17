const Joi = require("@hapi/joi");
const bcrypt = require("bcrypt");
const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");
// const passport = require("passport");

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

const authorize = async (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization");
    if (!authorizationHeader) {
      next({ status: 401, message: "Not authorized" });
    }
    const token = authorizationHeader.replace("Bearer ", "");

    let userId;
    try {
      userId = await jwt.verify(token, process.env.JWT_SECRET)._id;
    } catch (err) {
      next({ status: 401, message: "User not authorized" });
    }

    const user = await userModel.findById(userId);
    if (!user || user.token !== token) {
      next({ status: 401, message: "Not authorized" });
    }

    req.user = user;
    req.token = token;

    next();
  } catch (err) {
    next(err);
  }
};

const validateSubscription = async (req, res, next) => {
  const validationRules = Joi.object({
    subscription: Joi.string().required(),
  });

  const validResult = validationRules.validate(req.body);
  if (validResult.error) {
    return res.status(400).json(validResult.error);
  }

  next();
};

// Validate through passport
// const passportAuthorize = () =>
//   passport.authenticate("jwt", { session: false });

module.exports = {
  validateRegister,
  validateLogin,
  authorize,
  validateSubscription,
  // passportAuthorize,
};
