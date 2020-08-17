const Joi = require("@hapi/joi");
const {
  Types: { ObjectId },
} = require("mongoose");


const validateCreateContact = (req, res, next) => {
  const validationRules = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    subscription: Joi.string().required(),
    password: Joi.string().required(),
  });

  const validResult = validationRules.validate(req.body);
  if (validResult.error) {
    return res.status(400).json({ message: "missing required name field" });
  }

  next();
};

const validateUpdateContact = (req, res, next) => {
  const updateContactRules = Joi.object({
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
    subscription: Joi.string(),
    password: Joi.string(),
  });

  const validResult = updateContactRules.validate(req.body);
  if (validResult.error) {
    return res.status(400).json(validResult.error);
  }

  next();
};

const validateId = (req, res, next) => {
  const { contactId } = req.params;

  if (!ObjectId.isValid(contactId)) {
    return res.status(404).json({ message: "Invalid ID" });
  }
  next();
};

module.exports = {
  validateCreateContact,
  validateUpdateContact,
  validateId,
};
