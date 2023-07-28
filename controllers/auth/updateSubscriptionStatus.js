const { User, updateSubscriptionSchema } = require("../../models/user");
const { HttpError, ctrlWrapper } = require("../../utils");

const updateSubscriptionStatus = async (req, res) => {
  const { error } = updateSubscriptionSchema.validate(req.body);

  if (error) {
    throw HttpError(400, error.message);
  }

  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json({
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });
};

module.exports = {
  updateSubscriptionStatus: ctrlWrapper(updateSubscriptionStatus),
};
