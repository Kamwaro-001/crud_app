const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
const {
  registerUser,
  loginUser,
  updateUser,
  getLoggedInUser,
  forgotPassword,
  updatePassword,
} = require("../controllers/userController");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getLoggedInUser);
router.put("/me", protect, updateUser);

router.post("/forgotPassword", forgotPassword);
router.post("/updatePassword", updatePassword);

module.exports = router;
