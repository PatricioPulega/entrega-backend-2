import { v4 as uuidv4 } from 'uuid';

export class PurchaseService {
  constructor(clientesRepository, productosRepository, ticketsRepository) {
    this.clientesRepository = clientesRepository;
    this.productosRepository = productosRepository;
    this.ticketsRepository = ticketsRepository;
  }

  async finalizePurchase(cid, productos = []) {
    const errores = [];
    let total = 0;

    const cliente = await this.clientesRepository.getById(cid);
    if (!cliente) {
      return { status: 'error', errors: [`Cliente con id ${cid} no encontrado`] };
    }

    for (const item of productos) {
      const producto = await this.productosRepository.getById(item.id);
      if (!producto || producto.stock < item.cantidad) {
        errores.push(`Problemas con el producto id ${item.id}`);
      } else {
        item.descrip = producto.descrip;
        item.price = producto.price;
        item.subtotal = producto.price * item.cantidad;
        total += item.subtotal;

        await this.productosRepository.update(item.id, {
          stock: producto.stock - item.cantidad
        });
      }
    }

    if (errores.length > 0) {
      return { status: 'error', errors: errores };
    }

    const ticket = await this.ticketsRepository.create({
      code: uuidv4(),
      purchase_datetime: new Date(),
      amount: total,
      purchaser: cliente.email,
      items: productos.map(p => ({
        product: p.id,
        quantity: p.cantidad,
        price: p.price
      })),
      status: 'complete'
    });

    return { status: 'success', ticket };
  }
}
