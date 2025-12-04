import Cart from '../dao/models/cart.model.js';

// Crear carrito
const createCart = async (req, res) => {
  try {
    const newCart = await Cart.create({ products: [] });
    res.json({ status: "success", data: newCart });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Obtener carrito por ID
const getCartById = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await Cart.findById(cid).populate('products.product');
    if (!cart) {
      return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
    }
    res.json({ status: "success", data: cart });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Agregar producto al carrito
const addProductToCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findById(cid);
    if (!cart) {
      return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
    }

    const existingProduct = cart.products.find(p => p.product.toString() === pid);
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ product: pid, quantity });
    }

    await cart.save();
    res.json({ status: "success", data: cart });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Actualizar cantidad de producto en carrito
const updateProductQuantity = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findById(cid);
    if (!cart) {
      return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
    }

    const productInCart = cart.products.find(p => p.product.toString() === pid);
    if (!productInCart) {
      return res.status(404).json({ status: "error", message: "Producto no encontrado en carrito" });
    }

    productInCart.quantity = quantity;
    await cart.save();

    res.json({ status: "success", data: cart });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Eliminar producto del carrito
const deleteProductFromCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const cart = await Cart.findById(cid);
    if (!cart) {
      return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
    }

    cart.products = cart.products.filter(p => p.product.toString() !== pid);
    await cart.save();

    res.json({ status: "success", data: cart });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Finalizar compra
const purchaseCart = async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await Cart.findById(cid).populate('products.product');

    if (!cart) {
      return res.status(404).json({ status: "error", message: "Carrito no encontrado" });
    }

    // Calcular monto total
    let amount = 0;
    cart.products.forEach(p => {
      amount += p.product.price * p.quantity;
    });

    // Generar ticket
    const ticket = {
      code: Date.now().toString(),
      amount,
      purchaser: req.user.email, // viene del middleware de auth
      purchase_datetime: new Date()
    };

    // Vaciar carrito
    cart.products = [];
    await cart.save();

    res.json({ status: "success", data: ticket });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

// Exportar todas las funciones en un único bloque
export {
  createCart,
  getCartById,
  addProductToCart,
  updateProductQuantity,
  deleteProductFromCart,
  purchaseCart
};