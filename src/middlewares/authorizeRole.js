export const authorizeRole = (roles) => {
  // Acepta un string o un array de roles
  const allowedRoles = Array.isArray(roles) ? roles : [roles];

  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ status: 'error', error: 'No autenticado' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'error',
        error: `Acceso denegado. Roles permitidos: ${allowedRoles.join(', ')}`
      });
    }

    next();
  };
};