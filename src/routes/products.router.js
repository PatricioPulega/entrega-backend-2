import { Router } from 'express';
import passport from 'passport';
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} from '../controllers/products.controller.js';
import { authorizeRole } from '../middlewares/authorizeRole.js';

const router = Router();

// Crear producto (solo admin autenticado)
router.post(
  '/',
  passport.authenticate('current', { session: false }),
  authorizeRole('admin'),
  createProduct
);

// Listar productos (público)
router.get('/', getProducts);

// Obtener producto por ID (público)
router.get('/:pid', getProductById);

// Actualizar producto (solo admin autenticado)
router.put(
  '/:pid',
  passport.authenticate('current', { session: false }),
  authorizeRole('admin'),
  updateProduct
);

// Eliminar producto (solo admin autenticado)
router.delete(
  '/:pid',
  passport.authenticate('current', { session: false }),
  authorizeRole('admin'),
  deleteProduct
);

export default router