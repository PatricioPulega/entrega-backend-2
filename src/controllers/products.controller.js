import productsRepo from '../repositories/products.repository.js';
import { ProductDTO } from '../dtos/product.dto.js';

// 🔹 Crear producto (solo admin)
export async function createProduct(req, res, next) {
  try {
    const product = await productsRepo.create(req.body);
    const dto = new ProductDTO(product);
    res.status(201).json({ status: 'success', payload: dto });
  } catch (err) {
    next(err); // pasa al errorHandler global
  }
}

// 🔹 Listar productos con paginación
export async function getProducts(req, res, next) {
  try {
    const products = await productsRepo.getAll(req.query);
    const dtoProducts = products.docs.map(p => new ProductDTO(p));

    res.json({
      status: 'success',
      payload: dtoProducts,
      totalPages: products.totalPages,
      page: products.page,
      hasPrevPage: products.hasPrevPage,
      hasNextPage: products.hasNextPage,
      prevLink: products.prevLink || null,
      nextLink: products.nextLink || null
    });
  } catch (err) {
    next(err);
  }
}

// 🔹 Obtener producto por ID
export async function getProductById(req, res, next) {
  try {
    const product = await productsRepo.getById(req.params.pid);
    if (!product) {
      return res.status(404).json({ status: 'error', error: 'Producto no encontrado' });
    }
    res.json({ status: 'success', payload: new ProductDTO(product) });
  } catch (err) {
    next(err);
  }
}

// 🔹 Actualizar producto (solo admin)
export async function updateProduct(req, res, next) {
  try {
    const updated = await productsRepo.update(req.params.pid, req.body);
    if (!updated) {
      return res.status(404).json({ status: 'error', error: 'Producto no encontrado' });
    }
    res.json({ status: 'success', payload: new ProductDTO(updated) });
  } catch (err) {
    next(err);
  }
}

// 🔹 Eliminar producto (solo admin)
export async function deleteProduct(req, res, next) {
  try {
    const deleted = await productsRepo.delete(req.params.pid);
    if (!deleted) {
      return res.status(404).json({ status: 'error', error: 'Producto no encontrado' });
    }
    res.json({ status: 'success', message: 'Producto eliminado correctamente' });
  } catch (err) {
    next(err);
  }
}