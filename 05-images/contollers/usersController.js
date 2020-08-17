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

const updateSubscription = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await userModel.findByIdAndUpdate(
      _id,
      { $set: req.body },
      { new: true }
    );

    const { subscription, email } = user;
    return res.status(200).json({ subscription, email });
  } catch (error) {
    next();
  }
};

module.exports = {
  currentUser,
  updateSubscription,
};
