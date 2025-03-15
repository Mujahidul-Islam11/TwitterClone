const express = require("express");
const { createPost, deletePost, commentOnPost } = require("../controller/postController");
const protectedRoute = require("../middleware/protectedRoute");
const router = express.Router();

router.post("/create", protectedRoute, createPost);
router.post("/comment/:id", protectedRoute, commentOnPost);
router.delete("/:id", protectedRoute, deletePost);

module.exports = router;
