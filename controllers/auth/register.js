const bcrypt = require("bcrypt");

const { User, registerSchema } = require("../../models/user");
const { HttpError, ctrlWrapper } = require("../../utils");

const register = async (req, res) => {
  const { error } = registerSchema.validate(req.body);

  if (error) {
    throw HttpError(400, error.message);
  }

  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const result = await User.create({ ...req.body, password: hashPassword });
  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });
};

module.exports = {
  register: ctrlWrapper(register),
};
