const { Contact } = require("../../models/contact");
const { ctrlWrapper } = require("../../utils");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite = false } = req.query;
  const skip = (page - 1) * limit;
  const filter = favorite ? { owner, favorite } : { owner };
  const result = await Contact.find(filter, "", {
    skip,
    limit,
  }).populate("owner", "email subscription");
  res.json(result);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
};
