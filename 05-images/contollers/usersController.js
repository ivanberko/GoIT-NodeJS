const fs = require("fs");
const fsPromises = fs.promises;
const path = require("path");
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

const updateAvatar = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { filename } = req.file;

    const olFfileAvatarName = path.basename(req.user.avatarURL);
    await fsPromises.unlink(
      path.resolve(`./public/images/${olFfileAvatarName}`),
      (err) => {
        if (err) next(err);
      }
    );

    const newFileAvatarPublic = await fsPromises.readFile(req.file.path);
    await fsPromises.writeFile(
      path.resolve(`./public/images/${filename}`),
      newFileAvatarPublic
    );

    await fsPromises.unlink(path.resolve(`./tmp/${filename}`), (err) => {
      if (err) next(err);
    });

    const user = await userModel.findByIdAndUpdate(
      _id,
      { $set: { avatarURL: `http://localhost:5000/images/${filename}` } },
      { new: true }
    );
    const { avatarURL } = user;
    return res.status(200).json({ avatarURL });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  currentUser,
  updateSubscription,
  updateAvatar,
};
