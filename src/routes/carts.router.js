import { Router } from 'express';
import passport from 'passport';
import {
  createCart,
  addProductToCart,
  purchaseCart,
  getCartById,
  deleteProductFromCart,
  updateProductQuantity,
  emptyCart
} from '../controllers/carts.controller.js';
import { authorizeRole } from '../middlewares/authorizeRole.js';

const router = Router();

// Crear carrito (solo usuarios logueados con rol user)
router.post(
  '/',
  passport.authenticate('current', { session: false }),
  authorizeRole('user'),
  createCart
);

// Ver carrito por ID (user o admin)
router.get(
  '/:cid',
  passport.authenticate('current', { session: false }),
  authorizeRole(['user', 'admin']),
  getCartById
);

// Agregar producto al carrito
router.post(
  '/:cid/products/:pid',
  passport.authenticate('current', { session: false }),
  authorizeRole('user'),
  addProductToCart
);

// Actualizar cantidad de producto
router.put(
  '/:cid/products/:pid',
  passport.authenticate('current', { session: false }),
  authorizeRole('user'),
  updateProductQuantity
);

// Eliminar producto del carrito
router.delete(
  '/:cid/products/:pid',
  passport.authenticate('current', { session: false }),
  authorizeRole('user'),
  deleteProductFromCart
);

// Vaciar carrito
router.delete(
  '/:cid',
  passport.authenticate('current', { session: false }),
  authorizeRole('user'),
  emptyCart
);

// Finalizar compra
router.post(
  '/:cid/purchase',
  passport.authenticate('current', { session: false }),
  authorizeRole('user'),
  purchaseCart
);

export default router;