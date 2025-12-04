import ProductModel from './models/product.model.js';

export default class ProductsDAO {
  async getAll() {
    return await ProductModel.find();
  }

  async getById(id) {
    return await ProductModel.findById(id);
  }

  async create(data) {
    return await ProductModel.create(data);
  }

  async updateById(id, data) {
    return await ProductModel.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteById(id) {
    return await ProductModel.findByIdAndDelete(id);
  }
}
