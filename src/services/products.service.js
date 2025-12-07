import ProductModel from '../dao/models/product.model.js';

class ProductService {
  async getPaginated(query = {}, options = {}) {
    return await ProductModel.paginate(query, options);
  }

  async getAll() {
    return await ProductModel.find();
  }
}

export default new ProductService();
