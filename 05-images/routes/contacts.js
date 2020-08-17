const express = require("express");
const router = express.Router();

const contactController = require("../contollers/contactController");
const validate = require("../validate/validateContact")

router.get("/", contactController.getContacts);
router.get("/:contactId", validate.validateId, contactController.getContact);
router.post("/", validate.validateCreateContact, contactController.createContact);
router.delete("/:contactId", validate.validateId, contactController.deleteContact);
router.patch(
  "/:contactId",
  validate.validateId,
  validate.validateUpdateContact,
  contactController.patchContact
);

module.exports = router;
