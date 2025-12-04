import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { authorize } from '../middleware/authorize.js';
import { finalizePurchase } from '../controllers/tickets.controller.js';

const router = Router();

// Endpoint para finalizar compra y generar ticket
router.post('/:cid/purchase', requireAuth, authorize('user'), finalizePurchase);

export default router;
