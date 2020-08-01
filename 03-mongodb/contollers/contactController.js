const contactModel = require("../model/contact.model");
const {
  Types: { ObjectId },
} = require("mongoose");

getContacts = async (req, res, next) => {
  try {
    const list = await contactModel.find();
    return res.json({ status: "ok", list });
  } catch (error) {
    next(error);
  }
};

getContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactModel.findById(contactId);
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.json({ status: "ok", contact });
  } catch (error) {
    next(error);
  }
};

createContact = async (req, res, next) => {
  try {
    const createContact = await contactModel.create(req.body);
    return res.status(201).json({ status: "ok", createContact });
  } catch (error) {
    next(error);
  }
};

deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const removeContact = await contactModel.findByIdAndDelete(contactId);
    if (!removeContact) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.status(200).json({ status: "ok", message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

patchContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    if (!Object.keys(req.body).length) {
      return res.status(400).json({ message: "missing fields" });
    }
    const update = await contactModel.findByIdAndUpdate(contactId, {
      $set: req.body,
    });
    if (!update) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.status(200).json({ status: "ok", message: "contact update" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  patchContact,
};
