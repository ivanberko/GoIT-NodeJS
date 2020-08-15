const userModel = require("../model/userModel");

const currentUser = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await userModel.findById(_id, { email: 1, subscription: 1 });

    if (!user) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    return res.status(200).json(user);
  } catch (error) {
    next();
  }
};

module.exports = {
  currentUser,
};
