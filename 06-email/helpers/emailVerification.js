module.exports.mail = (email, link) => ({
  to: email,
  from: "berko.ivan.kh@gmail.com",
  subject: "and easy to do anywhere, even with Node.js",
  text: "Congratulations, you have successfully verified your mail.",
  html: `
  <p>Follow the link below to confirm your email verification</p>
  <a href="http://localhost:5000/auth/verify/${link}">http://localhost:5000/auth/verify/${link}</a>`,
});
