const express = require("express");
const { createPost, deletePost, commentOnPost, likeUnlikePost, getAllPosts } = require("../controller/postController");
const protectedRoute = require("../middleware/protectedRoute");
const router = express.Router();

router.get("/posts", protectedRoute, getAllPosts);
router.post("/create", protectedRoute, createPost);
router.post("/likeUnlike/:id", protectedRoute, likeUnlikePost);
router.post("/comment/:id", protectedRoute, commentOnPost);
router.delete("/:id", protectedRoute, deletePost);

module.exports = router;
