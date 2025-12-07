// src/dao/carts.dao.js
import mongoose from 'mongoose';
import CartModel from './models/cart.model.js';

export default class CartsDAO {
  async getById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return CartModel.findById(id).populate('products.product');
  }

  async create(data = {}) {
    return CartModel.create(data);
  }

  async updateById(id, data) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return CartModel.findByIdAndUpdate(id, data, { new: true })
      .populate('products.product');
  }

  async replaceProducts(id, products) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return CartModel.findByIdAndUpdate(id, { products }, { new: true })
      .populate('products.product');
  }

  async addProductRaw(cid, pid, quantity = 1) {
    if (!mongoose.Types.ObjectId.isValid(cid)) return null;
    const cart = await CartModel.findById(cid);
    if (!cart) return null;
    cart.products.push({ product: pid, quantity });
    await cart.save();
    return CartModel.findById(cid).populate('products.product');
  }

  async updateProductQuantityRaw(cid, pid, quantity) {
    if (!mongoose.Types.ObjectId.isValid(cid)) return null;
    const cart = await CartModel.findById(cid);
    if (!cart) return null;
    const productInCart = cart.products.find(p => p.product.toString() === pid);
    if (!productInCart) return null;
    productInCart.quantity = quantity;
    await cart.save();
    return CartModel.findById(cid).populate('products.product');
  }

  async deleteProduct(cid, pid) {
    if (!mongoose.Types.ObjectId.isValid(cid)) return null;
    const cart = await CartModel.findById(cid);
    if (!cart) return null;
    cart.products = cart.products.filter(p => p.product.toString() !== pid);
    await cart.save();
    return CartModel.findById(cid).populate('products.product');
  }

  async emptyCart(cid) {
    if (!mongoose.Types.ObjectId.isValid(cid)) return null;
    return CartModel.findByIdAndUpdate(cid, { products: [] }, { new: true })
      .populate('products.product');
  }
}