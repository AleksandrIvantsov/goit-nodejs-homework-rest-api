const { ctrlWrapper, HttpError, sendEmail } = require("../../utils");
const { User, emailSchema } = require("../../models/user");
require("dotenv").config();

const { BASE_URL } = process.env;

const resendVerificationEmail = async (req, res) => {
  const { error } = emailSchema.validate(req.body);

  if (error) {
    throw HttpError(400, error.message);
  }

  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/users/verify/${user.verificationToken}">Click to verify your email</a>`,
  };

  await sendEmail(verifyEmail);

  res.json({
    message: "Verification email sent",
  });
};

module.exports = {
  resendVerificationEmail: ctrlWrapper(resendVerificationEmail),
};
