import ProductsDAO from '../dao/products.dao.js';

const dao = new ProductsDAO();

class ProductRepository {
  async getAll(filter = {}, options = {}) {
    return dao.getPaginated(filter, options);
  }

  async getById(id) {
    return dao.findById(id);
  }

  async create(data) {
    return dao.create(data);
  }

  async update(id, data) {
    return dao.updateById(id, data);
  }

  async delete(id) {
    return dao.deleteById(id);
  }
}

export default new ProductRepository();