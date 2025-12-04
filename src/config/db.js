import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('🟢 Conectado a MongoDB');
  } catch (error) {
    console.error('🔴 Error de conexión a MongoDB:', error);
    process.exit(1); // corta la app si no conecta
  }
};
