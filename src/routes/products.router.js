import { Router } from 'express';
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from '../controllers/products.controller.js';
import { authMiddleware } from '../middlewares/auth.js';
import { authorizeRole } from '../middlewares/authorizeRole.js';

const router = Router();

router.post('/', authMiddleware, authorizeRole('admin'), createProduct);
router.get('/', getProducts);
router.get('/:pid', getProductById);
router.put('/:pid', authMiddleware, authorizeRole('admin'), updateProduct);
router.delete('/:pid', authMiddleware, authorizeRole('admin'), deleteProduct);

export default router;
