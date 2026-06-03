import express from "express";

import {
  register,
  login,
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";
import { requireRole } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/me", protect, (req, res) => {
  res.json({
    message: "You are authorized.",
    user: req.user,
  });
});

router.get("/admin-test", protect, requireRole("admin"), (req, res) => {
  res.json({
    message: "Admin access granted.",
    user: req.user,
  });
});

export default router;