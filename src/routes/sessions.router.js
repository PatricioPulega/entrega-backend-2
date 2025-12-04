import { Router } from 'express';
import passport from 'passport';
import bcrypt from 'bcrypt';
import { generateToken, generateResetToken, verifyToken } from '../config/jwt.js';
import usersRepo from '../repositories/users.repository.js';
import { cartDBManager } from '../dao/cartDBManager.js';
import { productDBManager } from '../dao/productDBManager.js';
import { UserDTO } from '../dtos/user.dto.js';
import { sendMail } from '../config/mailer.js';

const router = Router();
const CartService = new cartDBManager(new productDBManager());

// Registro
router.post('/register', async (req, res) => {
  try {
    const { first_name, last_name, email, age, password, role } = req.body;
    const existe = await usersRepo.getByEmail(email);
    if (existe) return res.status(400).json({ status: 'error', message: 'Email ya registrado' });

    const newCart = await CartService.createCart();
    const passwordEncriptada = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    // ✅ asignar rol según lo que venga en el body
    const userRole = role === 'admin' ? 'admin' : 'user';

    const user = await usersRepo.create({
      first_name,
      last_name,
      email,
      age,
      password: passwordEncriptada,
      cart: newCart._id,
      role: userRole
    });

    res.status(201).json({ status: 'success', payload: new UserDTO(user) });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await usersRepo.getByEmail(email);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ status: 'error', message: 'Credenciales inválidas' });
    }

    const token = generateToken({ id: user._id, role: user.role, email: user.email });
    res.json({ status: 'success', token, payload: new UserDTO(user) });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Current (Passport + DTO)
router.get('/current', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const dto = new UserDTO(req.user);
    res.json({ status: 'success', payload: dto });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Recuperación de contraseña - request
router.post('/reset/request', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await usersRepo.getByEmail(email);
    if (!user) return res.json({ status: 'success' }); // no revelar existencia

    const token = generateResetToken({ id: user._id, email: user.email });
    const link = `${process.env.FRONT_BASE || 'http://localhost:8080'}/reset-password?token=${token}`;

    await sendMail({
      to: email,
      subject: 'Restablecer contraseña',
      html: `<h2>Recuperación de contraseña</h2>
             <p>Este enlace expira en 1 hora.</p>
             <a href="${link}" style="padding:10px 16px;background:#2b6cb0;color:#fff;border-radius:6px;text-decoration:none;">
             Restablecer contraseña</a>`
    });

    res.json({ status: 'success', message: 'Si el usuario existe, se envió el mail' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Recuperación de contraseña - confirm
router.post('/reset/confirm', async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const payload = verifyToken(token);
    if (!payload) return res.status(400).json({ status: 'error', message: 'Token inválido o expirado' });

    const user = await usersRepo.getByEmail(payload.email);
    if (!user) return res.status(404).json({ status: 'error', message: 'Usuario no encontrado' });

    const isSame = bcrypt.compareSync(newPassword, user.password);
    if (isSame) return res.status(400).json({ status: 'error', message: 'La nueva contraseña no puede ser igual a la anterior' });

    const newHash = bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10));
    await usersRepo.updatePassword(user._id, newHash);

    res.json({ status: 'success', message: 'Contraseña actualizada' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

export default router;
