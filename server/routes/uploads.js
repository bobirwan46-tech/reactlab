import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

import {
  uploadFile,
  getUploads,
  deleteUpload,
} from "../controllers/uploadsController.js";

const router = express.Router();

router.get("/", protect, getUploads);

router.delete("/:id", protect, deleteUpload);

router.post(
  "/",
  protect,
  upload.single("file"),
  uploadFile
);

export default router;