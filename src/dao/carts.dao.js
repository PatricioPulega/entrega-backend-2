import CartModel from './models/cart.model.js';

export default class CartsDAO {
  async getById(id) {
    return await CartModel.findById(id).populate('products.product');
  }

  async create(data) {
    return await CartModel.create(data);
  }

  async updateById(id, data) {
    return await CartModel.findByIdAndUpdate(id, data, { new: true });
  }

  async replaceProducts(id, products) {
    return await CartModel.findByIdAndUpdate(id, { products }, { new: true });
  }
}
