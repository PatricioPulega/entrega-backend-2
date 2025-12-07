export class CartDTO {
  constructor(cart) {
    this.id = cart._id?.toString() || null;
    this.products = cart.products?.map(item => ({
      productId: item.product?._id?.toString() || null,
      title: item.product?.title || null,
      price: item.product?.price || 0,
      quantity: item.quantity || 0
    })) || [];
  }
}
