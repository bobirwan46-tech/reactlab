import pool from "../db/pool.js";

export async function getPosts(req, res) {
  const { search, sort } = req.query;

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  let whereClause = "";
  let values = [];

  if (search) {
    whereClause = "WHERE title ILIKE $1 OR body ILIKE $1";
    values.push(`%${search}%`);
  }

  let orderBy = "ORDER BY id DESC";

  if (sort === "oldest") {
    orderBy = "ORDER BY id ASC";
  } else if (sort === "title_az") {
    orderBy = "ORDER BY title ASC";
  } else if (sort === "title_za") {
    orderBy = "ORDER BY title DESC";
  }

  const postsQuery = `
    SELECT * FROM posts
    ${whereClause}
    ${orderBy}
    LIMIT $${values.length + 1}
    OFFSET $${values.length + 2}
  `;

  const countQuery = `
    SELECT COUNT(*) FROM posts
    ${whereClause}
  `;

  const postsResult = await pool.query(postsQuery, [
    ...values,
    limit,
    offset,
  ]);

  const countResult = await pool.query(countQuery, values);

  const total = Number(countResult.rows[0].count);
  const totalPages = Math.ceil(total / limit);

  res.json({
    data: postsResult.rows,
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  });
}

export async function createPost(req, res) {
  const { title, body } = req.body;

  const userId = req.user.id;

  const result = await pool.query(
    `
    INSERT INTO posts (title, body, user_id)
    VALUES ($1, $2, $3)
    RETURNING *
    `,
    [title, body, userId]
  );

  res.status(201).json(result.rows[0]);
}

export async function updatePost(req, res) {
  const { id } = req.params;
  const { title, body } = req.body;

  const userId = req.user.id;
  const isAdmin = req.user.role === "admin";

  const postResult = await pool.query(
    `
    SELECT *
    FROM posts
    WHERE id = $1
    `,
    [id]
  );

  if (postResult.rows.length === 0) {
    const error = new Error("Post not found.");
    error.statusCode = 404;
    throw error;
  }

  const post = postResult.rows[0];
  const isOwner = post.user_id === userId;

  if (!isOwner && !isAdmin) {
    const error = new Error("You are not allowed to update this post.");
    error.statusCode = 403;
    throw error;
  }

  const result = await pool.query(
    `
    UPDATE posts
    SET title = $1, body = $2
    WHERE id = $3
    RETURNING *
    `,
    [title, body, id]
  );

  res.json(result.rows[0]);
}

export async function deletePost(req, res) {
  const { id } = req.params;

  const userId = req.user.id;
  const isAdmin = req.user.role === "admin";

  const postResult = await pool.query(
    `
    SELECT *
    FROM posts
    WHERE id = $1
    `,
    [id]
  );

  if (postResult.rows.length === 0) {
    const error = new Error("Post not found.");
    error.statusCode = 404;
    throw error;
  }

  const post = postResult.rows[0];
  const isOwner = post.user_id === userId;

  if (!isOwner && !isAdmin) {
    const error = new Error("You are not allowed to delete this post.");
    error.statusCode = 403;
    throw error;
  }

  const result = await pool.query(
    `
    DELETE FROM posts
    WHERE id = $1
    RETURNING *
    `,
    [id]
  );

  res.json({
    message: "Post deleted successfully",
    deletedPost: result.rows[0],
  });
}