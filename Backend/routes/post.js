const express = require("express");
const { createPost } = require("../controller/postController");
const protectedRoute = require("../middleware/protectedRoute");
const router = express.Router();

router.post("/create", protectedRoute, createPost);

module.exports = router;
