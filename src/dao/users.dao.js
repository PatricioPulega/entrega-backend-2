import UserModel from './models/user.model.js';

export default class UsersDAO {
  async findByEmail(email) {
    return await UserModel.findOne({ email });
  }

  async findById(id) {
    return await UserModel.findById(id);
  }

  async create(userData) {
    return await UserModel.create(userData);
  }

  async updateById(id, data) {
    return await UserModel.findByIdAndUpdate(id, data, { new: true });
  }
}