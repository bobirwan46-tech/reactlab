import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from "../controllers/postsController.js";

import { validatePost } from "../middleware/validatePost.js";
import { validateId } from "../middleware/validateId.js";
import { asyncHandler } from "../middleware/asyncHandler.js";

const router = express.Router();

router.get("/", asyncHandler(getPosts));

router.post(
  "/",
  protect,
  validatePost,
  asyncHandler(createPost)
);

router.put(
  "/:id",
  protect,
  validateId,
  validatePost,
  asyncHandler(updatePost)
);

router.delete(
  "/:id",
  protect,
  validateId,
  asyncHandler(deletePost)
);

export default router;