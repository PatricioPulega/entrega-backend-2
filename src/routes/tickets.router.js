import { Router } from 'express';
import passport from 'passport';
import { getTickets, getTicketById, deleteTicket } from '../controllers/tickets.controller.js';
import { authorizeRole } from '../middlewares/authorizeRole.js';

const router = Router();

// Listar tickets (solo admin)
router.get(
  '/',
  passport.authenticate('current', { session: false }),
  authorizeRole('admin'),
  getTickets
);

// Obtener ticket por ID (admin o dueño del ticket)
router.get(
  '/:tid',
  passport.authenticate('current', { session: false }),
  authorizeRole(['admin', 'user']),
  getTicketById
);

// Eliminar ticket (solo admin)
router.delete(
  '/:tid',
  passport.authenticate('current', { session: false }),
  authorizeRole('admin'),
  deleteTicket
);

export default router;