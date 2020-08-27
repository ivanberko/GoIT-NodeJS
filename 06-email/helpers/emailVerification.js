require("dotenv").config();
module.exports.mail = (email, link) => ({
  to: email,
  from: process.env.MAIL_FROM,
  subject: "and easy to do anywhere, even with Node.js",
  text: "Congratulations, you have successfully verified your mail.",
  html: `
  <p>Follow the link below to confirm your email verification</p>
  <a href="http://localhost:${process.env.PORT}/auth/verify/${link}">http://localhost:${process.env.PORT}/auth/verify/${link}</a>`,
});
