const { Contact } = require("../../models/contact");
const { HttpError, ctrlWrapper } = require("../../utils");

const getContactById = async (req, res) => {
  const result = await Contact.findById(req.params.contactId);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

module.exports = {
  getContactById: ctrlWrapper(getContactById),
};
