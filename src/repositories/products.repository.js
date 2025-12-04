import Product from '../dao/models/product.model.js';

class ProductRepository {
  async getAll() { return await Product.find(); }
  async getById(id) { return await Product.findById(id); }
  async create(data) { return await Product.create(data); }
  async update(id, data) { return await Product.findByIdAndUpdate(id, data, { new: true }); }
  async delete(id) { return await Product.findByIdAndDelete(id); }
}

export default new ProductRepository();
