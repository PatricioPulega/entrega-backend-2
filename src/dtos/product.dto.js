export class ProductDTO {
  constructor(product) {
    this.id = product._id?.toString() || null;
    this.name = product.title?.trim() || null;
    this.description = product.description?.trim() || null;
    this.price = product.price || 0;
    this.stock = product.stock || 0;
    this.category = product.category || null;
    this.owner = product.owner || 'admin';
  }
}