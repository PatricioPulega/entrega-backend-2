import CartsDAO from '../dao/carts.dao.js';
import ProductsDAO from '../dao/products.dao.js';
import TicketsDAO from '../dao/tickets.dao.js';
import { v4 as uuidv4 } from 'uuid';
import { TicketDTO } from '../dtos/ticket.dto.js';

const cartsDAO = new CartsDAO();
const productsDAO = new ProductsDAO();
const ticketsDAO = new TicketsDAO();

export default {
  async purchaseCart(cid, userEmail) {
    const cart = await cartsDAO.getById(cid);
    if (!cart) throw new Error('Carrito no encontrado');

    let amount = 0;
    const unfulfilledItems = [];
    const fulfilledItems = [];

    for (const item of cart.products) {
      const product = await productsDAO.findById(item.product);
      if (!product) continue;

      if (product.stock >= item.quantity) {
        await productsDAO.updateById(product._id, { stock: product.stock - item.quantity });
        amount += product.price * item.quantity;
        fulfilledItems.push({ product: product._id, quantity: item.quantity });
      } else {
        unfulfilledItems.push({
          id: product._id,
          title: product.title,
          requested: item.quantity,
          available: product.stock
        });
      }
    }

    // Generar ticket
    const ticketDoc = await ticketsDAO.create({
      code: uuidv4(),
      amount,
      purchaser: userEmail
    });
    const ticket = new TicketDTO(ticketDoc);

    // Actualizar carrito con los productos pendientes
    await cartsDAO.replaceProducts(
      cid,
      unfulfilledItems.map(item => ({
        product: item.id,
        quantity: item.requested
      }))
    );

    return { ticket, unfulfilledItems };
  }
};