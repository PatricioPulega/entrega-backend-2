import { requireRole } from './auth.js';

// Alias simplificado: permite un único rol
export const authorizeRole = (role) => requireRole(role);
