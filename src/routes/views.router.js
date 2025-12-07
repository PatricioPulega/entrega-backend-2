import { Router } from 'express';
import ProductService from '../services/products.service.js'; // ajustá el path según tu estructura
import CartRepository from '../repositories/carts.repository.js';

const router = Router();

// Página de inicio
router.get('/', (req, res) => {
  res.render('index', {
    title: 'Inicio',
    style: 'index.css',
    user: req.user || null
  });
});

// Vista de productos con paginación
router.get('/products', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const result = await ProductService.getPaginated({}, { page, limit, lean: true });

    res.render('products', {
      title: 'Productos',
      style: 'index.css',
      products: result.docs,
      pagination: {
        page: result.page,
        totalPages: result.totalPages,
        hasNextPage: result.hasNextPage,
        hasPrevPage: result.hasPrevPage,
        nextPage: result.nextPage,
        prevPage: result.prevPage
      },
      user: req.user || null
    });
  } catch (error) {
    console.error('Error cargando productos:', error);
    res.status(500).send('Error cargando productos');
  }
});

// Vista de carrito
router.get('/cart/:cid', async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await CartRepository.getById(cid);

    res.render('cart', {
      title: 'Carrito',
      style: 'index.css',
      cart,
      user: req.user || null
    });
  } catch (error) {
    console.error('Error cargando carrito:', error);
    res.status(500).send('Error cargando carrito');
  }
});

// Vista de login
router.get('/login', (req, res) => {
  res.render('login', {
    title: 'Login',
    style: 'index.css'
  });
});

// Vista de registro
router.get('/register', (req, res) => {
  res.render('register', {
    title: 'Registro',
    style: 'index.css'
  });
});

// Vista de productos en tiempo real
router.get('/realtimeproducts', async (req, res) => {
  try {
    const products = await ProductService.getAll();
    res.render('realTimeProducts', {
      title: 'Productos en tiempo real',
      style: 'index.css',
      products,
      user: req.user || null
    });
  } catch (error) {
    console.error('Error cargando productos en tiempo real:', error);
    res.status(500).send('Error cargando productos en tiempo real');
  }
});

export default router;