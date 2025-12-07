import { UserDTO } from '../dtos/user.dto.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  res.json({ status: 'success', payload: new UserDTO(req.user) });
};

export const login = async (req, res) => {
  const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({
    status: 'success',
    payload: {
      token,
      user: new UserDTO(req.user)
    }
  });
};

export const current = async (req, res) => {
  res.json({ status: 'success', payload: new UserDTO(req.user) });
};

export const resetRequest = async (req, res) => {
  res.json({ status: 'success', message: 'Reset request pendiente de implementación' });
};

export const resetConfirm = async (req, res) => {
  res.json({ status: 'success', message: 'Reset confirm pendiente de implementación' });
};