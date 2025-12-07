import mongoose from 'mongoose';
import UserModel from './models/user.model.js';

export default class UsersDAO {
  async findById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    try {
      return await UserModel.findById(id).lean();
    } catch (err) {
      throw new Error('Error al buscar usuario por ID: ' + err.message);
    }
  }

  async findByEmail(email) {
    try {
      return await UserModel.findOne({ email }).lean();
    } catch (err) {
      throw new Error('Error al buscar usuario por email: ' + err.message);
    }
  }

  async findAll() {
    try {
      return await UserModel.find().lean();
    } catch (err) {
      throw new Error('Error al listar usuarios: ' + err.message);
    }
  }

  async create(userData) {
    try {
      return await UserModel.create(userData);
    } catch (err) {
      throw new Error('Error al crear usuario: ' + err.message);
    }
  }

  async updateById(id, data) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    try {
      return await UserModel.findByIdAndUpdate(id, data, { new: true }).lean();
    } catch (err) {
      throw new Error('Error al actualizar usuario: ' + err.message);
    }
  }

  async deleteById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    try {
      return await UserModel.findByIdAndDelete(id).lean();
    } catch (err) {
      throw new Error('Error al eliminar usuario: ' + err.message);
    }
  }

  async findByRole(role) {
    try {
      return await UserModel.find({ role }).lean();
    } catch (err) {
      throw new Error('Error al buscar usuarios por rol: ' + err.message);
    }
  }
}