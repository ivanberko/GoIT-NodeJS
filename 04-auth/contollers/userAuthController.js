const bcrypt = require("bcrypt");
require("dotenv").config();
const userModel = require("../model/userModel");

const signUp = async (req, res, next) => {
  try {
    console.log(process.env.SALT);
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

module.exports = {
  signUp,
};
