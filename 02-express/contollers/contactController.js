const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../services/contacts");

module.exports.getContacts = async (req, res, next) => {
  try {
    const list = await listContacts();
    res.json({ status: "ok", list });
  } catch (error) {
    next(error);
  }
};

module.exports.getContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.json({ status: "ok", contact });
  } catch (error) {
    next(error);
  }
};

module.exports.createContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const createContact = await addContact(req.body);
    if (!name || !email || !phone) {
      return res.status(400).json({ message: "missing required name field" });
    }
    return res.status(201).json({ status: "ok", createContact });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const findContactById = await getContactById(contactId);
    if (!findContactById) {
      return res.status(404).json({ message: "Not found" });
    }
    await removeContact(contactId);
    return res.status(200).json({ status: "ok", message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports.patchContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    if (!Object.keys(req.body).length) {
      return res.status(400).json({ message: "missing fields" });
    }
    const update = await updateContact(contactId, req.body);
    if (!update) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.status(200).json({ status: "ok", update });
  } catch (error) {
    next(error);
  }
};
