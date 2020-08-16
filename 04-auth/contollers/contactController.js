const contactModel = require("../model/contact.model");
const {
  Types: { ObjectId },
} = require("mongoose");

getContacts = async (req, res, next) => {
  try {
    const { page, limit, sub } = req.query;
    const skip = page * limit - limit;
    const query = contactModel.find();

    query.skip(skip);
    query.limit(Number(limit));

    if (sub) {
      const filterSub = await contactModel.aggregate([
        { $match: { subscription: { $in: [sub] } } },
      ]);
      return res.json({ status: "ok", filterSub });
    }

    const list = await query.exec();

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
    const update = await contactModel.findContactByIdAndUpdate(
      contactId,
      req.body
    );
    if (!update) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.status(200).json({ status: "ok", update });
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
