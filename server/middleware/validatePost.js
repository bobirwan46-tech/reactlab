export function validatePost(req, res, next) {
  const { title, body } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({
      message: "Title is required",
    });
  }

  if (!body || body.trim() === "") {
    return res.status(400).json({
      message: "Body is required",
    });
  }

  next();
}