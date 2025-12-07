// src/dao/models/ticket.model.js
import mongoose from "mongoose";

const ticketCollection = "tickets";

const ticketSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, trim: true }, // consigna: único
  purchase_datetime: { type: Date, default: Date.now },             // fecha de emisión
  amount: { type: Number, required: true, min: 0 },                 // monto total
  purchaser: { type: String, required: true, trim: true }           // email del comprador
}, { timestamps: true });

// ✅ Evita OverwriteModelError
const TicketModel = mongoose.models[ticketCollection] 
  || mongoose.model(ticketCollection, ticketSchema);

export default TicketModel;