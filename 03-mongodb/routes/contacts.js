const express = require("express");
const router = express.Router();
const Joi = require("@hapi/joi");
const contactController = require("../contollers/contactController");

const validateCreateUser = (req, res, next) => {
  const createUserRules = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
  });

  const result = createUserRules.validate(req.body);
  if (result.error) {
    return res.status(400).json(result.error);
  }

  next();
};

const validateUpdateUser = (req, res, next) => {
  const updateUserRules = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
  });

  const result = updateUserRules.validate(req.body);
  if (result.error) {
    return res.status(400).json(result.error);
  }

  next();
};

router.get("/", contactController.getContacts);
router.get("/:contactId", contactController.getContact);
router.post("/", validateCreateUser, contactController.createContact);
router.delete("/:contactId", contactController.deleteContact);
router.patch("/:contactId", validateUpdateUser, contactController.patchContact);

module.exports = router;
