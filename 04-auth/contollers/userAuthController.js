const bcrypt = require("bcrypt");
const passport = require("passport");
const JWT = require("jsonwebtoken");
const userModel = require("../model/userModel");

const signUp = async (req, res, next) => {
  try {
    const { email, password, subscription } = req.body;
    const hash = await bcrypt.hash(password, Number(process.env.SALT));
    await userModel.create({
      email,
      password: hash,
      subscription,
    });
    return res.status(201).json({
      user: {
        email,
        subscription: subscription || "free",
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  passport.authenticate("local", { session: false }, (error, user, info) => {
    if (error || !user) {
      return next({ status: 401, message: info || error.message });
    }
    return req.logIn(user, { session: false }, async (err) => {
      if (err) {
        res.send(err);
      }
      const token = JWT.sign(user.toJSON(), process.env.JWT_SECRET);
      await userModel.findByIdAndUpdate(user._id, { token });
      return res.json({
        token,
        user: { email: user.email, subscription: user.subscription },
      });
    });
  })(req, res);
};

module.exports = {
  signUp,
  login,
};
