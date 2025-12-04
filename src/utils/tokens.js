import { generateToken, verifyToken } from '../config/jwt.js';

// Crear un token para un usuario (ej. al registrarse o loguearse)
export const createUserToken = (user) => {
  // Solo guardás datos seguros en el payload
  const payload = { id: user._id, email: user.email, role: user.role };
  return generateToken(payload, '1h'); // expira en 1 hora
};

// Validar token recibido (ej. en un middleware)
export const validateUserToken = (token) => {
  const decoded = verifyToken(token);
  if (!decoded) {
    return { valid: false, error: 'Token inválido o expirado' };
  }
  return { valid: true, data: decoded };
};
