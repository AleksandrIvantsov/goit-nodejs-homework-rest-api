const express = require("express");

const {
  register,
  login,
  getCurrent,
  logout,
  updateSubscriptionStatus,
  updateAvatar,
  verifyEmail,
  resendVerificationEmail,
} = require("../../controllers/auth");
const { authenticate, upload } = require("../../middlewares");

const router = express.Router();

router.post("/register", register);

router.get("/verify/:verificationToken", verifyEmail);

router.post("/verify", resendVerificationEmail);

router.post("/login", login);

router.get("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);

router.patch("/", authenticate, updateSubscriptionStatus);

router.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar);

module.exports = router;
