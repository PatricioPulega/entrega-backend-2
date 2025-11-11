import { Router } from 'express';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import { cartDBManager } from '../dao/cartDBManager.js';
import { productDBManager } from '../dao/productDBManager.js';

const router = Router();
const CartService = new cartDBManager(new productDBManager());
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/register', async (req, res) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;

    const existe = await User.findOne({ email });
    if (existe) return res.status(400).json({ status: 'error', message: 'Email ya registrado' });

    const newCart = await CartService.createCart();
    const passwordEncriptada = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const user = new User({
      first_name,
      last_name,
      email,
      age,
      password: passwordEncriptada,
      cart: newCart._id
    });

    await user.save();
    res.status(201).json({ status: 'success', payload: user });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ status: 'error', message: 'Credenciales inválidas' });
  }

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ status: 'success', token });
});

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ status: 'success', payload: req.user });
});

export default router;
