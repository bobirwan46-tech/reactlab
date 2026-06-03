import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import avatarUpload from "../middleware/avatarUploadMiddleware.js";

import {
  uploadAvatar,
} from "../controllers/usersController.js";

const router = express.Router();

router.post(
  "/avatar",
  protect,
  avatarUpload.single("avatar"),
  uploadAvatar
);

export default router;