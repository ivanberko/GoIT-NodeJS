const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const usersController = require("../contollers/usersController");
const validate = require("../validate/validateAuth");

router.post("/current", validate.authorize, usersController.currentUser);
router.patch(
  "/subscription",
  validate.authorize,
  validate.validateSubscription,
  usersController.updateSubscription
);

const storage = multer.diskStorage({
  destination: "./tmp",
  filename: function (req, file, cb) {
    const ext = path.parse(file.originalname).ext;
    cb(null, Date.now() + ext);
  },
});
const upload = multer({ storage });

router.post(
  "/images",
  validate.authorize,
  upload.single("fielname"),
  usersController.updateAvatar
);

module.exports = router;
