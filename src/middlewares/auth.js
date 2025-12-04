import { verifyToken } from '../config/jwt.js';

// Autenticación JWT manual
export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ status: 'error', message: 'Token faltante' });
  }

  const [scheme, token] = authHeader.split(' ');
  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ status: 'error', message: 'Formato de autorización inválido' });
  }

  let decoded;
  try {
    decoded = verifyToken(token);
  } catch (err) {
    return res.status(403).json({ status: 'error', message: 'Token inválido o expirado' });
  }

  req.user = decoded;
  next();
};

// Autorización por roles
export const requireRole = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    console.warn(`Acceso denegado: rol ${req.user ? req.user.role : 'sin rol'}`);
    return res.status(403).json({ status: 'error', message: 'No autorizado' });
  }
  next();
};
