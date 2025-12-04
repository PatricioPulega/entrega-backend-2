import bcrypt from 'bcrypt';

// Generar hash de una contraseña
export const hashPassword = async (password) => {
  const saltRounds = 10; // número de rondas de encriptación
  return await bcrypt.hash(password, saltRounds);
};

// Comparar contraseña ingresada con el hash almacenado
export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
