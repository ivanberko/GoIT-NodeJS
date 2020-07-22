const express = require("express");
const router = express.Router();
const contactController = require("../contollers/contactController");

router.get("/", contactController.getContacts);
router.get("/:contactId", contactController.getContact);
router.post("/", contactController.createContact);
router.delete("/:contactId", contactController.deleteContact);
router.patch("/:contactId", contactController.patchContact);

module.exports = router;
