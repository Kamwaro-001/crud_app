const express = require("express");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
const {
  registerUser,
  loginUser,
  updateUser,
  getLoggedInUser,
} = require("../controllers/userController");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getLoggedInUser);
router.put("/me", protect, updateUser);

module.exports = router;
