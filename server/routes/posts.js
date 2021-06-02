import express from "express";
const router = express.Router();
import {
  createPost,
  getSinglePost,
  getPosts,
  updatePost,
  deletePost,
  likePost,
} from "../controllers/posts.js";

router.get("/", getPosts);
router.get("/:id", getSinglePost);
router.post("/", createPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);
router.patch("/:id/like", likePost);

export default router;
