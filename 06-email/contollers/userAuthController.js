const bcrypt = require("bcrypt");
const passport = require("passport");
const JWT = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
const { v4: uuidv4 } = require("uuid");
const userModel = require("../model/userModel");

const { getPathNewAvatar } = require("../helpers/fileHelpers");
const { mail } = require("../helpers/emailVerification");

const signUp = async (req, res, next) => {
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const { email, password, subscription } = req.body;
    const hash = await bcrypt.hash(password, Number(process.env.SALT));
    const avatar = await getPathNewAvatar();
    const verificationToken = uuidv4();

    await userModel.create({
      email,
      password: hash,
      subscription,
      verificationToken,
      avatarURL: `http://localhost:5000/images/${avatar}`,
    });

    sgMail.send(mail(email, verificationToken));

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

const verificationToken = async (req, res, next) => {
  const { verificationToken } = req.params;
  const user = await userModel.findOneAndUpdate(
    { verificationToken },
    { $unset: { verificationToken: 1 } }
  );
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json({ message: "ok" });
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
      await userModel.findByIdAndUpdate(user._id, { $set: { token } });
      const { email, subscription } = user;
      return res.json({
        token,
        user: { email, subscription },
      });
    });
  })(req, res);
};

const logout = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await userModel.findByIdAndUpdate(_id, {
      $set: { token: null },
    });

    if (!user) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    return res.status(204).send();
  } catch (error) {
    next();
  }
};

module.exports = {
  signUp,
  login,
  logout,
  verificationToken,
};
