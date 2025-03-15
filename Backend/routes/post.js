const express = require("express");
const { createPost, deletePost } = require("../controller/postController");
const protectedRoute = require("../middleware/protectedRoute");
const router = express.Router();

router.post("/create", protectedRoute, createPost);
router.delete("/:id", protectedRoute, deletePost);

module.exports = router;
