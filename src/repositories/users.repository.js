import UsersDAO from '../dao/users.dao.js';
import { UserDTO } from '../dtos/user.dto.js';

class UsersRepository {
  constructor(dao = new UsersDAO()) {
    this.dao = dao;
  }

  async getById(id) {
    const user = await this.dao.findById(id);
    return user ? new UserDTO(user) : null;
  }

  async getByEmail(email) {
    const user = await this.dao.findByEmail(email);
    return user ? new UserDTO(user) : null;
  }

  async getRawById(id) {
    return this.dao.findById(id); // documento crudo con password
  }

  async getRawByEmail(email) {
    return this.dao.findByEmail(email); // documento crudo con password
  }

  async getAll() {
    const users = await this.dao.findAll();
    return users.map(u => new UserDTO(u));
  }

  async create(userData) {
    return this.dao.create(userData);
  }

  async updatePassword(userId, newHash) {
    return this.dao.updateById(userId, { password: newHash });
  }

  async updateRole(userId, role) {
    return this.dao.updateById(userId, { role });
  }

  async delete(userId) {
    return this.dao.deleteById(userId);
  }
}

export default new UsersRepository();