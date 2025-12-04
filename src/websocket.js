import { productDBManager } from './dao/productDBManager.js';
const ProductService = new productDBManager();

export default (io) => {
  io.on('connection', (socket) => {
    socket.on('createProduct', async (data) => {
      try {
        await ProductService.createProduct(data);
        const products = await ProductService.getAllProducts({});
        io.emit('publishProducts', products.docs);
      } catch (error) {
        socket.emit('statusError', error.message);
      }
    });

    socket.on('deleteProduct', async (data) => {
      try {
        await ProductService.deleteProduct(data.pid);
        const products = await ProductService.getAllProducts({});
        io.emit('publishProducts', products.docs);
      } catch (error) {
        socket.emit('statusError', error.message);
      }
    });
  });
};
