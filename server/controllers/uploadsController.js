import fs from "fs/promises";
import path from "path";

import pool from "../db/pool.js";

export async function uploadFile(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded.",
      });
    }

    const result = await pool.query(
      `
      INSERT INTO uploads (
        user_id,
        original_name,
        stored_name,
        mime_type,
        size,
        file_path
      )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
      `,
      [
        req.user.id,
        req.file.originalname,
        req.file.filename,
        req.file.mimetype,
        req.file.size,
        req.file.path,
      ]
    );

    res.status(201).json({
      message: "File uploaded successfully.",
      file: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to upload file.",
    });
  }
}

export async function getUploads(req, res) {
  try {
    const result = await pool.query(
      `
      SELECT *
      FROM uploads
      WHERE user_id = $1
      ORDER BY created_at DESC
      `,
      [req.user.id]
    );

    res.status(200).json({
      uploads: result.rows,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch uploads.",
    });
  }
}

export async function deleteUpload(req, res) {
  try {
    const { id } = req.params;

    const existingUpload = await pool.query(
      `
      SELECT *
      FROM uploads
      WHERE id = $1
      AND user_id = $2
      `,
      [id, req.user.id]
    );

    if (existingUpload.rows.length === 0) {
      return res.status(404).json({
        message: "Upload not found.",
      });
    }

    const upload = existingUpload.rows[0];

    try {
      const absoluteFilePath = path.resolve(upload.file_path);

      await fs.unlink(absoluteFilePath);
    } catch (fileError) {
      console.error("File deletion error:", fileError.message);
    }

    await pool.query(
      `
      DELETE FROM uploads
      WHERE id = $1
      AND user_id = $2
      `,
      [id, req.user.id]
    );

    res.status(200).json({
      message: "File deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to delete file.",
    });
  }
}