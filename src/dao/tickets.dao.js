import mongoose from 'mongoose';
import TicketModel from './models/ticket.model.js';

export default class TicketsDAO {
  async findById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return TicketModel.findById(id).lean();
  }

  async findAll() {
    return TicketModel.find().lean();
  }

  async create(data) {
    return TicketModel.create({
      ...data,
      createdAt: new Date() // 🔹 siempre guardar fecha de emisión
    });
  }

  async updateById(id, data) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return TicketModel.findByIdAndUpdate(id, data, { new: true }).lean();
  }

  async deleteById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return TicketModel.findByIdAndDelete(id).lean();
  }
}