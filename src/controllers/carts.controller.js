import cartsRepository from '../repositories/carts.repository.js';
import purchaseService from '../services/purchase.service.js';
import { CartDTO } from '../dtos/cart.dto.js';

export const createCart = async (req, res, next) => {
  try {
    const cart = await cartsRepository.create({});
    res.status(201).json({ status: 'success', payload: new CartDTO(cart) });
  } catch (err) { next(err); }
};

export const getCartById = async (req, res, next) => {
  try {
    const cart = await cartsRepository.getById(req.params.cid);
    if (!cart) {
      return res.status(404).json({ status: 'error', error: 'Carrito no encontrado' });
    }
    res.json({ status: 'success', payload: new CartDTO(cart) });
  } catch (err) { next(err); }
};

export const addProductToCart = async (req, res, next) => {
  try {
    // Si viene quantity en el body, lo usamos; si no, default = 1
    const quantity = req.body.quantity && Number.isInteger(req.body.quantity) && req.body.quantity > 0
      ? req.body.quantity
      : 1;

    const cart = await cartsRepository.addProduct(req.params.cid, req.params.pid, quantity);
    res.json({ status: 'success', payload: new CartDTO(cart) });
  } catch (err) { next(err); }
};

export const updateProductQuantity = async (req, res, next) => {
  try {
    const { quantity } = req.body;

    // ✅ Validación rápida
    if (!Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({
        status: 'error',
        error: 'Cantidad inválida. Debe ser un número entero mayor o igual a 1.'
      });
    }

    const cart = await cartsRepository.updateProductQuantity(
      req.params.cid,
      req.params.pid,
      quantity
    );

    res.json({ status: 'success', payload: new CartDTO(cart) });
  } catch (err) { next(err); }
};

export const deleteProductFromCart = async (req, res, next) => {
  try {
    const cart = await cartsRepository.deleteProduct(req.params.cid, req.params.pid);
    res.json({ status: 'success', payload: new CartDTO(cart) });
  } catch (err) { next(err); }
};

export const emptyCart = async (req, res, next) => {
  try {
    const cart = await cartsRepository.emptyCart(req.params.cid);
    res.json({ status: 'success', payload: new CartDTO(cart) });
  } catch (err) { next(err); }
};

export const purchaseCart = async (req, res, next) => {
  try {
    const result = await purchaseService.purchaseCart(req.params.cid, req.user.email);
    res.json({ status: 'success', payload: result });
  } catch (err) { next(err); }
};