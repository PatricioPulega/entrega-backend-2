import CartsDAO from '../dao/carts.dao.js';

const dao = new CartsDAO();

class CartsRepository {
  async getById(id) {
    return dao.getById(id);
  }

  async create(data) {
    return dao.create(data);
  }

  async updateById(id, data) {
    return dao.updateById(id, data);
  }

  async replaceProducts(id, products) {
    return dao.replaceProducts(id, products);
  }

  async addProduct(cid, pid, quantity = 1) {
    const cart = await dao.getById(cid);
    if (!cart) return null;

    const existingProduct = cart.products.find(p => p.product._id.toString() === pid);
    if (existingProduct) {
      existingProduct.quantity += quantity;
      return dao.updateById(cid, { products: cart.products });
    } else {
      return dao.addProductRaw(cid, pid, quantity);
    }
  }

  async updateProductQuantity(cid, pid, quantity) {
    const cart = await dao.getById(cid);
    if (!cart) return null;

    const productInCart = cart.products.find(p => p.product._id.toString() === pid);
    if (!productInCart) return null;

    productInCart.quantity = quantity;
    return dao.updateById(cid, { products: cart.products });
  }

  async deleteProduct(cid, pid) {
    return dao.deleteProduct(cid, pid);
  }

  async emptyCart(cid) {
    return dao.emptyCart(cid);
  }
}

export default new CartsRepository();