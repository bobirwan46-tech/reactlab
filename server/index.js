import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import postsRoutes from "./routes/posts.js";
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import uploadsRoutes from "./routes/uploads.js";
import usersRoutes from "./routes/users.js";

import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/*
  CORS Configuration
  Allows requests from React frontend
*/
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",

      "http://127.0.0.1:5173",
      "http://127.0.0.1:5174",

      "http://192.168.68.115:5173",
      "http://192.168.68.115:5174",
    ],
    credentials: true,
  })
);

app.use(express.json());

/*
  Static File Serving
  Makes files inside server/uploads publicly accessible
*/
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

/*
  Health Check
*/
app.get("/", (req, res) => {
  res.send("ReactLab Express API is running");
});

/*
  Routes
*/
app.use("/posts", postsRoutes);

app.use("/auth", authRoutes);

app.use("/admin", adminRoutes);

app.use("/uploads", uploadsRoutes);

app.use("/users", usersRoutes);

/*
  Global Error Handler
  Must always be AFTER routes
*/
app.use(errorHandler);

const PORT = process.env.PORT || 5001;

/*
  Listen on all network interfaces
  Allows access from:
  - localhost
  - 127.0.0.1
  - devices on the same Wi-Fi network
*/
app.listen(PORT, "0.0.0.0", () => {
  console.log(
    `🚀 Server is running on http://0.0.0.0:${PORT}`
  );

  console.log(
    `🌐 Local: http://127.0.0.1:${PORT}`
  );

  console.log(
    `📱 Network: http://192.168.68.115:${PORT}`
  );
});