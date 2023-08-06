const path = require("path");
const jimp = require("jimp");

const { User } = require("../../models/user");
const { ctrlWrapper } = require("../../utils");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { originalname } = req.file;

  const filename = `${_id}_${originalname}`;

  const avatar = await jimp.read(req.file.buffer);
  await avatar.cover(250, 250).writeAsync(path.join(avatarsDir, filename));

  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({
    avatarURL,
  });
};

module.exports = {
  updateAvatar: ctrlWrapper(updateAvatar),
};
