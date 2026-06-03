import express from "express";

import {
  getAllUsers,
  updateUserRole,
} from "../controllers/adminController.js";

import { protect } from "../middleware/authMiddleware.js";
import { requireRole } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get(
  "/users",
  protect,
  requireRole("admin"),
  getAllUsers
);

router.patch(
  "/users/:id/role",
  protect,
  requireRole("admin"),
  updateUserRole
);

export default router;