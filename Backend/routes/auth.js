const express = require("express");
const router = express.Router();
const { login, signUp, logOut, getMe } = require("../controller/authController");
const protectedRoute = require("../middleware/protectedRoute");

router.post("/me", protectedRoute, getMe);

router.post("/signup", signUp);

router.post("/login", login);

router.post("/logout", logOut);

module.exports = router;
