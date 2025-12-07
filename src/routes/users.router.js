import { Router } from 'express';
import passport from 'passport';
import {
  registerUser,
  getUserById,
  getAllUsers,
  deleteUser
} from '../controllers/users.controller.js';
import { authorizeRole } from '../middlewares/authorizeRole.js';

const router = Router();

// Registro de usuario (público)
router.post('/register', registerUser);

// Obtener usuario por ID (solo autenticado)
router.get(
  '/:uid',
  passport.authenticate('current', { session: false }),
  authorizeRole(['user', 'admin']),
  getUserById
);

// Listar todos los usuarios (solo admin)
router.get(
  '/',
  passport.authenticate('current', { session: false }),
  authorizeRole('admin'),
  getAllUsers
);

// Eliminar usuario (solo admin)
router.delete(
  '/:uid',
  passport.authenticate('current', { session: false }),
  authorizeRole('admin'),
  deleteUser
);

export default router;