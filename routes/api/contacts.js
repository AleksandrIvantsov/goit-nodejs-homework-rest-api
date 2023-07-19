const express = require("express");

const { isValidId } = require("../../middlewares");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contacts");

const router = express.Router();

router.get("/", listContacts);

router.get("/:contactId", isValidId, getContactById);

router.post("/", addContact);

router.delete("/:contactId", isValidId, removeContact);

router.put("/:contactId", isValidId, updateContact);

router.patch("/:contactId/favorite", isValidId, updateStatusContact);

module.exports = router;
