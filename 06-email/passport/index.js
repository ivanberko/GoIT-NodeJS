const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const userModel = require("../model/userModel");

const localStrategy = () => {
  passport.serializeUser((user, cb) => {
    cb(null, JSON.stringify(user));
  });
  passport.deserializeUser((obj, cb) => {
    cb(null, JSON.parse(obj));
  });

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      (email, password, done) => {
        userModel.findOne(
          { email: email.toLocaleLowerCase() },
          "-token",
          (err, user) => {
            if (err) {
              return done(err);
            }
            console.log(user);
            if (!user) {
              return done(null, false, {
                message: "Incorrect email or password",
              });
            }
            bcrypt.compare(password, user.password, function (err, result) {
              if (result) {
                return done(null, user, { message: "Logged In Successfully" });
              }
              return done(null, false, {
                message: "Incorrect email or password",
              });
            });
          }
        );
      }
    )
  );
};

const jwtStrategy = () => {
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
      },
      (jwtPayload, cb) =>
        userModel
          .findOne({ _id: jwtPayload._id })
          .then((user) => cb(null, user))
          .catch((err) => cb(err))
    )
  );
};

module.exports.initializeStrategies = () => {
  localStrategy();
  jwtStrategy();
};
