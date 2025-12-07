import usersRepository from '../repositories/users.repository.js';
import { UserDTO } from '../dtos/user.dto.js';

export const registerUser = async (req, res, next) => {
  try {
    const user = await usersRepository.create(req.body);
    res.status(201).json({ status: 'success', payload: new UserDTO(user) });
  } catch (err) { next(err); }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await usersRepository.getById(req.params.uid);
    if (!user) {
      return res.status(404).json({ status: 'error', error: 'Usuario no encontrado' });
    }
    res.json({ status: 'success', payload: new UserDTO(user) });
  } catch (err) { next(err); }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await usersRepository.getAll();
    res.json({ status: 'success', payload: users.map(u => new UserDTO(u)) });
  } catch (err) { next(err); }
};

export const deleteUser = async (req, res, next) => {
  try {
    const result = await usersRepository.delete(req.params.uid);
    if (!result) {
      return res.status(404).json({ status: 'error', error: 'Usuario no encontrado' });
    }
    res.json({ status: 'success', payload: 'Usuario eliminado' });
  } catch (err) { next(err); }
};
