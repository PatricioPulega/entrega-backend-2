import { Router } from 'express';
import { 
  createCart, 
  addProductToCart, 
  purchaseCart, 
  getCartById, 
  deleteProductFromCart, 
  updateProductQuantity 
} from '../controllers/carts.controller.js';
import { authMiddleware } from '../middlewares/auth.js';
import { authorizeRole } from '../middlewares/authorizeRole.js';

const router = Router();

// Crear carrito (solo usuarios logueados)
router.post('/', authMiddleware, authorizeRole('user'), createCart);

// Ver carrito por ID
router.get('/:cid', authMiddleware, authorizeRole('user'), getCartById);

// Agregar producto al carrito
router.post('/:cid/products/:pid', authMiddleware, authorizeRole('user'), addProductToCart);

// Actualizar cantidad de producto
router.put('/:cid/products/:pid', authMiddleware, authorizeRole('user'), updateProductQuantity);

// Eliminar producto del carrito
router.delete('/:cid/products/:pid', authMiddleware, authorizeRole('user'), deleteProductFromCart);

// Finalizar compra
router.post('/:cid/purchase', authMiddleware, authorizeRole('user'), purchaseCart);

export default router;