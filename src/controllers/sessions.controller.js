import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import usersRepo from '../repositories/users.repository.js';
import { UserDTO } from '../dtos/user.dto.js';
import { requestReset, confirmReset } from '../services/passwordReset.service.js';

// Ruta /current → devuelve DTO sin datos sensibles
export async function current(req, res) {
  try {
    const dto = new UserDTO(req.user);
    return res.json({ status: 'success', payload: dto });
  } catch (err) {
    return res.status(500).json({ status: 'error', error: err.message });
  }
}

// Login con validación y token
export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await usersRepo.getByEmail(email);

    if (!user) {
      return res.status(401).json({ status: 'error', error: 'Credenciales inválidas' });
    }

    // Validar contraseña
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ status: 'error', error: 'Credenciales inválidas' });
    }

    // Generar token JWT con rol incluido
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ status: 'success', token, payload: new UserDTO(user) });
  } catch (err) {
    res.status(500).json({ status: 'error', error: err.message });
  }
}

// Registro con hash y rol
export async function register(req, res) {
  try {
    const { first_name, last_name, email, age, password, role } = req.body;

    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ status: 'error', error: 'Campos obligatorios faltantes' });
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Rol: admin si se envía explícito, user por defecto
    const userRole = role === 'admin' ? 'admin' : 'user';

    const newUser = await usersRepo.create({
      first_name,
      last_name,
      email,
      age,
      password: hashedPassword,
      role: userRole
    });

    res.status(201).json({ status: 'success', payload: new UserDTO(newUser) });
  } catch (err) {
    res.status(500).json({ status: 'error', error: err.message });
  }
}

// Solicitar reset de contraseña
export async function resetRequest(req, res) {
  try {
    const { email } = req.body;
    await requestReset(email, process.env.BASE_URL);
    res.json({ status: 'success', message: 'Correo de recuperación enviado' });
  } catch (err) {
    res.status(500).json({ status: 'error', error: err.message });
  }
}

// Confirmar reset de contraseña
export async function resetConfirm(req, res) {
  try {
    const { token, newPassword } = req.body;
    await confirmReset(token, newPassword);
    res.json({ status: 'success', message: 'Contraseña actualizada correctamente' });
  } catch (err) {
    res.status(400).json({ status: 'error', error: err.message });
  }
}
