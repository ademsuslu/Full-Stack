const express = require("express");
const {
  registerUser,
  loginUser,
  getMe,
} = require("../controller/userController.js");
const router = express.Router();
// Protect

const { protect } = require("../middleware/authMiddleware.js");
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);

module.exports = router;
