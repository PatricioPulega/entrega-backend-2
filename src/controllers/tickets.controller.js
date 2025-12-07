import TicketsRepository from '../repositories/tickets.repository.js';
import { TicketDTO } from '../dtos/ticket.dto.js';

// Obtener todos los tickets
export const getTickets = async (req, res, next) => {
  try {
    const tickets = await TicketsRepository.getAll();
    res.json({
      status: "success",
      payload: tickets.map(t => new TicketDTO(t))
    });
  } catch (error) {
    next(error);
  }
};

// Obtener ticket por ID
export const getTicketById = async (req, res, next) => {
  try {
    const { tid } = req.params;
    const ticket = await TicketsRepository.getById(tid);
    if (!ticket) {
      return res.status(404).json({ status: "error", error: "Ticket no encontrado" });
    }
    res.json({ status: "success", payload: new TicketDTO(ticket) });
  } catch (error) {
    next(error);
  }
};

// Eliminar ticket
export const deleteTicket = async (req, res, next) => {
  try {
    const { tid } = req.params;
    const ticket = await TicketsRepository.deleteById(tid);
    if (!ticket) {
      return res.status(404).json({ status: "error", error: "Ticket no encontrado" });
    }
    res.json({
      status: "success",
      payload: { message: "Ticket eliminado correctamente" }
    });
  } catch (error) {
    next(error);
  }
};