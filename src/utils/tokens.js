import jwt from 'jsonwebtoken';

const RESET_SECRET = process.env.JWT_RESET_SECRET || 'resetSecret';
const RESET_EXPIRATION = process.env.JWT_RESET_EXPIRATION || '1h';

// Generar token de reset
export const signResetToken = (userId) => {
  return jwt.sign({ id: userId }, RESET_SECRET, { expiresIn: RESET_EXPIRATION });
};

// Verificar token de reset
export const verifyResetToken = (token) => {
  try {
    return jwt.verify(token, RESET_SECRET);
  } catch (err) {
    return null; // si es inválido o expirado
  }
};