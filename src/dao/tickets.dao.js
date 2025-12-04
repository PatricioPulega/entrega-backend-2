import TicketModel from './models/ticket.model.js';

export default class TicketsDAO {
  async getById(id) {
    return await TicketModel.findById(id);
  }

  async create(data) {
    return await TicketModel.create(data);
  }

  async getAll() {
    return await TicketModel.find();
  }
}
