// src/repositories/users.repository.js
import UsersDAO from '../dao/users.dao.js';

class UsersRepository {
  constructor(dao = new UsersDAO()) {
    this.dao = dao;
  }

  async getByEmail(email) {
    // ahora llama al método correcto del DAO
    return this.dao.findByEmail(email);
  }

  async create(userData) {
    return this.dao.create(userData);
  }

  async updatePassword(userId, newHash) {
    return this.dao.updateById(userId, { password: newHash });
  }
}

export default new UsersRepository();
