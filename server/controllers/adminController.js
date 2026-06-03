import pool from "../db/pool.js";

export async function getAllUsers(req, res) {
  const result = await pool.query(
    `
    SELECT id, name, email, role, created_at
    FROM users
    ORDER BY id ASC
    `
  );

  res.json({
    data: result.rows,
  });
}

export async function updateUserRole(req, res) {
  const { id } = req.params;
  const { role } = req.body;

  if (!["admin", "user"].includes(role)) {
    return res.status(400).json({
      message: "Invalid role.",
    });
  }

  const userResult = await pool.query(
    `
    SELECT *
    FROM users
    WHERE id = $1
    `,
    [id]
  );

  if (userResult.rows.length === 0) {
    return res.status(404).json({
      message: "User not found.",
    });
  }

  const targetUser = userResult.rows[0];

  const isDemotingAdmin =
    targetUser.role === "admin" && role === "user";

  if (isDemotingAdmin) {
    const adminCountResult = await pool.query(
      `
      SELECT COUNT(*) AS count
      FROM users
      WHERE role = 'admin'
      `
    );

    const adminCount = Number(adminCountResult.rows[0].count);

    if (adminCount === 1) {
      return res.status(400).json({
        message: "Cannot remove the last remaining admin.",
      });
    }
  }

  const updateResult = await pool.query(
    `
    UPDATE users
    SET role = $1
    WHERE id = $2
    RETURNING id, name, email, role, created_at
    `,
    [role, id]
  );

  res.json({
    message: "Role updated successfully.",
    user: updateResult.rows[0],
  });
}