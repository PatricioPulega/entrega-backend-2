import ProductRepository from '../repositories/products.repository.js';

export const createProduct = async (req, res) => {
  try {
    const { title, description, code, price, stock, category } = req.body;

    if (!title || !description || !code || !price || !stock || !category) {
      return res.status(400).json({ status: 'error', error: 'Todos los campos son obligatorios' });
    }

    const product = await ProductRepository.create(req.body);
    res.status(201).json({ status: 'success', data: product });
  } catch (error) {
    res.status(500).json({ status: 'error', error: 'Error al crear producto' });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await ProductRepository.getAll();
    res.json({ status: 'success', data: products });
  } catch (error) {
    res.status(500).json({ status: 'error', error: 'Error al obtener productos' });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await ProductRepository.getById(req.params.pid);
    if (!product) {
      return res.status(404).json({ status: 'error', error: 'Producto no encontrado' });
    }
    res.json({ status: 'success', data: product });
  } catch (error) {
    res.status(500).json({ status: 'error', error: 'Error al obtener producto' });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await ProductRepository.update(req.params.pid, req.body);
    if (!product) {
      return res.status(404).json({ status: 'error', error: 'Producto no encontrado' });
    }
    res.json({ status: 'success', data: product });
  } catch (error) {
    res.status(500).json({ status: 'error', error: 'Error al actualizar producto' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await ProductRepository.delete(req.params.pid);
    if (!product) {
      return res.status(404).json({ status: 'error', error: 'Producto no encontrado' });
    }
    res.json({ status: 'success', message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ status: 'error', error: 'Error al eliminar producto' });
  }
};
