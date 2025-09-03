const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.status || 500;
  const errorMessage = err.message || "Server Error!!";
  let note = undefined;
  if (statusCode === 500) {
    note = "Our server is not working ok these days, we will fix it in 7 days";
  }
  res
    .status(statusCode)
    .json({ message: errorMessage, errors: err.errors || [], note });
};

export default errorMiddleware;