import CartsDAO from '../dao/carts.dao.js';
const dao = new CartsDAO();

export default {
  getById: (id) => dao.getById(id),
  create: (data) => dao.create(data),
  update: (id, data) => dao.updateById(id, data),
  replaceProducts: (id, products) => dao.replaceProducts(id, products)
};
