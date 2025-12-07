import TicketsDAO from '../dao/tickets.dao.js';

const dao = new TicketsDAO();

class TicketsRepository {
  async getById(id) {
    return dao.findById(id);
  }

  async getAll() {
    return dao.findAll();
  }

  async create(data) {
    return dao.create(data);
  }

  async updateById(id, data) {
    return dao.updateById(id, data);
  }

  async deleteById(id) {
    return dao.deleteById(id);
  }
}

export default new TicketsRepository();