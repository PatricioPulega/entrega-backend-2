export function errorHandler(err, req, res, next) {
  console.error(`[ERROR] ${err.message}`);

  if (process.env.NODE_ENV !== 'production' && err.stack) {
    console.error(err.stack);
  }

  const statusCode = err.statusCode || 500;
  const errorMessage =
    process.env.NODE_ENV === 'production'
      ? 'Error interno del servidor'
      : err.message;

  const response = {
    status: 'error',
    error: errorMessage
  };

  if (Array.isArray(err.errors)) {
    response.details = err.errors;
  }

  res.status(statusCode).json(response);
}