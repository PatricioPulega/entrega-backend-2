import { PurchaseService } from '../services/purchase.service.js';
import clientesRepo from '../repositories/users.repository.js';
import productosRepo from '../repositories/products.repository.js';
import ticketsRepo from '../repositories/tickets.repository.js';

const purchaseService = new PurchaseService(clientesRepo, productosRepo, ticketsRepo);

export async function finalizePurchase(req, res) {
  try {
    const { cid } = req.params;        // id del cliente
    const { productos } = req.body;    // array de productos con {id, cantidad}

    const ticket = await purchaseService.finalizePurchase(cid, productos);

    if (Array.isArray(ticket)) {
      // Si hubo errores con productos
      return res.status(400).json({ status: 'error', errors: ticket });
    }

    res.json({ status: 'success', payload: ticket });
  } catch (err) {
    res.status(500).json({ status: 'error', error: err.message });
  }
}
