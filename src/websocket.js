import { Server } from 'socket.io';
import ProductModel from './dao/models/product.model.js';

export default function initWebSocket(httpServer) {
  const io = new Server(httpServer);

  io.on('connection', async socket => {
    console.log('⚔️ Cliente conectado');

    // Publicar productos iniciales
    const products = await ProductModel.find();
    io.emit('publishProducts', products);

    // Crear producto
    socket.on('createProduct', async data => {
      try {
        await ProductModel.create(data);
        const products = await ProductModel.find();
        io.emit('publishProducts', products);
      } catch (error) {
        socket.emit('statusError', 'Error creando producto');
      }
    });

    // Eliminar producto
    socket.on('deleteProduct', async ({ pid }) => {
      try {
        await ProductModel.findByIdAndDelete(pid);
        const products = await ProductModel.find();
        io.emit('publishProducts', products);
      } catch (error) {
        socket.emit('statusError', 'Error eliminando producto');
      }
    });
  });
}