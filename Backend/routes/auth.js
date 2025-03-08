const express = require("express");
const router = express.Router();
const { login, signUp, logOut } = require("../controller/authController");

router.post("/signUp", signUp);

router.post("/login", login);

router.post("/logout", logOut);

module.exports = router;
