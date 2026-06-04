export function validateId(req, res, next) {
  const { id } = req.params;

  if (isNaN(Number(id))) {
    return res.status(400).json({
      message: "Invalid post ID",
    });
  }

  next();
}