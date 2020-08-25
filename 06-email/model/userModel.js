const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: String,
  password: String,
  avatarURL: String,
  subscription: {
    type: String,
    enum: ["free", "pro", "premium"],
    default: "free",
  },
  token: {
    type: String,
    default: null,
  },
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
