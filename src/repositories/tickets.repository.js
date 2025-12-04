import TicketsDAO from '../dao/tickets.dao.js';
const dao = new TicketsDAO();

export default {
  getById: (id) => dao.getById(id),
  create: (data) => dao.create(data),
  getAll: () => dao.getAll()
};
