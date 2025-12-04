import usersRepo from '../repositories/users.repository.js';
import { signResetToken, verifyResetToken } from '../utils/tokens.js';
import { sendResetEmail } from './mail.service.js';
import { hashPassword, comparePassword } from '../utils/bcrypt.js';

export async function requestReset(email, baseUrl) {
  const user = await usersRepo.getByEmail(email);
  if (!user) return;
  const token = signResetToken({ uid: user._id, email: user.email });
  const link = `${baseUrl}/api/sessions/reset/confirm?token=${token}`;
  await sendResetEmail(user.email, link);
}

export async function confirmReset(token, newPassword) {
  const payload = verifyResetToken(token);
  const user = await usersRepo.getById(payload.uid);

  const isSame = await comparePassword(newPassword, user.password);
  if (isSame) throw new Error('La nueva contraseña no puede ser igual a la anterior');

  const hashed = await hashPassword(newPassword);
  await usersRepo.update(user._id, { password: hashed });
}
