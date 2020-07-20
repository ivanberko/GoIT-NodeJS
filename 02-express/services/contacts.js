const path = require("path");
const fs = require("fs");
const { promises: fsPromises } = fs;

const contactsPath = path.join(__dirname, "../db/contacts.json");

async function listContacts() {
  try {
    const data = await fsPromises.readFile(contactsPath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.log(err);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fsPromises.readFile(contactsPath, "utf8");
    const dataParse = JSON.parse(data);
    return dataParse.find((contact) => contact.id === +contactId);
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fsPromises.readFile(contactsPath, "utf8");
    const dataParse = JSON.parse(data);
    const deleteContact = dataParse.filter(
      (contact) => contact.id !== +contactId
    );
    await fsPromises.writeFile(contactsPath, JSON.stringify(deleteContact));
    return deleteContact;
  } catch (error) {
    console.log(error);
  }
}

async function addContact({ name, email, phone }) {
  try {
    const data = await fsPromises.readFile(contactsPath, "utf8");
    const dataParse = JSON.parse(data);
    if (!name || !email || !phone) {
      return;
    }
    const newContact = {
      id: dataParse.length + 1,
      name,
      email,
      phone,
    };
    dataParse.push(newContact);
    await fsPromises.writeFile(contactsPath, JSON.stringify(dataParse));
    return newContact;
  } catch (error) {
    console.log(error);
  }
}

async function updateContact(contactId, updatedContact) {
  try {
    const data = await fsPromises.readFile(contactsPath, "utf8");
    const dataParse = JSON.parse(data);
    const findIndexContact = await dataParse.findIndex(
      (contact) => contact.id === +contactId
    );
    if (findIndexContact === -1) {
      return;
    }

    dataParse[findIndexContact] = {
      ...dataParse[findIndexContact],
      ...updatedContact,
    };
    await fsPromises.writeFile(contactsPath, JSON.stringify(dataParse));
    return dataParse[findIndexContact];
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
