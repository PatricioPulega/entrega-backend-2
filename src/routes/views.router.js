import { Router } from 'express';
import ProductsRepository from '../repositories/products.repository.js';
import CartsRepository from '../repositories/carts.repository.js';

const router = Router();
const ProductService = ProductsRepository;
const CartService = CartsRepository;

// Vista de productos con paginación
router.get('/products', async (req, res) => {
  try {
    const products = await ProductService.getPaginated(req.query);

    res.render('products', {
      title: 'Productos',
      style: 'index.css',
      products: products.docs,
      prevLink: products.prevLink || null,
      nextLink: products.nextLink || null
    });
  } catch (err) {
    res.render('notFound', { title: 'Error cargando productos', style: 'index.css' });
  }
});

// Vista de productos en tiempo real
router.get('/realtimeproducts', async (req, res) => {
  try {
    const products = await ProductService.getPaginated(req.query);
    res.render('realTimeProducts', {
      title: 'Productos en tiempo real',
      style: 'index.css',
      products: products.docs
    });
  } catch (err) {
    res.render('notFound', { title: 'Error cargando productos', style: 'index.css' });
  }
});

// Vista de carrito
router.get('/cart/:cid', async (req, res) => {
  try {
    const response = await CartService.findById(req.params.cid);

    if (!response) {
      return res.render('notFound', { title: 'Carrito no encontrado', style: 'index.css' });
    }

    res.render('cart', {
      title: 'Carrito',
      style: 'index.css',
      products: response.products,
      cartId: req.params.cid
    });
  } catch (err) {
    res.render('notFound', { title: 'Error cargando carrito', style: 'index.css' });
  }
});

// Vista de login
router.get('/login', (req, res) => {
  res.render('login', { title: 'Login', style: 'index.css' });
});

// Vista de registro
router.get('/register', (req, res) => {
  res.render('register', { title: 'Registro', style: 'index.css' });
});

export default router;