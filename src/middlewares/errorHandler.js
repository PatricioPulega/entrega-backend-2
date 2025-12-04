export function errorHandler(err, req, res, next) {
  console.error(`[ERROR] ${err.message}`);
  if (err.stack) console.error(err.stack);

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: 'error',
    message: err.message || 'Error interno del servidor'
  });
}
