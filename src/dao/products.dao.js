import mongoose from 'mongoose';
import ProductModel from './models/product.model.js';

export default class ProductsDAO {
  async findAll(filter = {}) {
    return ProductModel.find(filter).lean();
  }

  async findById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return ProductModel.findById(id).lean();
  }

  async create(data) {
    return ProductModel.create(data);
  }

  async updateById(id, data) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return ProductModel.findByIdAndUpdate(id, data, { new: true }).lean();
  }

  async deleteById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return ProductModel.findByIdAndDelete(id).lean();
  }

  async getPaginated(query, options) {
    // 🔹 requiere mongoose-paginate-v2 en ProductModel
    return ProductModel.paginate(query, options);
  }
}