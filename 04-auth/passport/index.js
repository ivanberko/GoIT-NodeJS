const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const LocalStrategy = require("passport-local").Strategy;

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
        const hashPassword = encryptPassword(password);
        User.findOne(
          { email: email.toLocaleLowerCase(), password: hashPassword },
          (err, user) => {
            if (err) {
              return done(err);
            }
            if (!user) {
              return done(null, false, {
                message: "Incorrect email or password",
              });
            }
            return done(null, user, { message: "Logged In Successfully" });
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
        jwtFromRequest: ExtractJwt.fromHeader("jwtauthorization"),
        secretOrKey: config.get("jwt_secret"),
      },
      (jwtPayload, cb) =>
        User.findOne({ _id: jwtPayload._id })
          .then((user) => cb(null, user))
          .catch((err) => cb(err))
    )
  );
};

module.exports.initializeStrategies = () => {
  localStrategy();
  jwtStrategy();
};
