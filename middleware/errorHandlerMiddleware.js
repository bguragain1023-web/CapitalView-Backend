export const errorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server error";

  console.log(error.message);
  res.status(statusCode).json({
    status: "error",
    message,
  });
};
