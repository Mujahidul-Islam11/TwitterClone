const express = require("express");
const protectedRoute = require("../middleware/protectedRoute");
const { getUserProfile, followUnfollow, updateProfile } = require("../controller/userController");
const router = express.Router();

router.get("/profile/:username",protectedRoute, getUserProfile);
router.get("/suggested", protectedRoute, getUserProfile);
router.post("/follow/:id", protectedRoute, followUnfollow);
router.post("/update", protectedRoute, updateProfile);

module.exports = router;