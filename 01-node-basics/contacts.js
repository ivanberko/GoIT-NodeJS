const path = require("path");
const fs = require("fs");
const { promises: fsPromises } = fs;

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function listContacts() {
  try {
    const data = await fsPromises.readFile(contactsPath, "utf8");
    const result = JSON.parse(data);
    return result.map((item) => ({
      name: item.name,
      phone: item.phone,
    }));
  } catch (err) {
    console.log(err);
  }
}

function getContactById(contactId) {}

function removeContact(contactId) {}

function addContact(name, email, phone) {}

module.exports = { listContacts };
