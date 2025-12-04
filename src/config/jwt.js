import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// Generar token
export const generateToken = (payload, expiresIn = '1h') => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};
// token de reset (1 hora fijo)
export const generateResetToken = (payload) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

// Verificar token
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null; // si es inválido o expirado
  }
};
