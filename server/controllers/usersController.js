import fs from "fs/promises";
import path from "path";

import pool from "../db/pool.js";

export async function uploadAvatar(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No avatar uploaded.",
      });
    }

    const existingUser = await pool.query(
      `
      SELECT *
      FROM users
      WHERE id = $1
      `,
      [req.user.id]
    );

    if (existingUser.rows.length === 0) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    const user = existingUser.rows[0];

    /*
      Delete previous avatar if it exists
    */
    if (user.avatar_path) {
      try {
        const absoluteFilePath = path.resolve(
          user.avatar_path.replace(/^\//, "")
        );

        await fs.unlink(absoluteFilePath);
      } catch (fileError) {
        console.error(
          "Old avatar deletion error:",
          fileError.message
        );
      }
    }

    const avatarPath = `/${req.file.path}`;

    const result = await pool.query(
      `
      UPDATE users
      SET avatar_path = $1
      WHERE id = $2
      RETURNING
        id,
        name,
        email,
        avatar_path,
        created_at
      `,
      [
        avatarPath,
        req.user.id,
      ]
    );

    res.status(200).json({
      message: "Avatar updated successfully.",
      user: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to upload avatar.",
    });
  }
}