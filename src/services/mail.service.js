import { transporter } from '../config/mailer.js';
import { logger } from '../utils/logger.js';

export async function sendResetEmail(to, link) {
  try {
    return await transporter.sendMail({
      from: `"Soporte Ecommerce" <${process.env.MAIL_USER}>`,
      to,
      subject: 'Recuperación de contraseña',
      html: `
        <h2>Recuperación de contraseña</h2>
        <p>Para restablecer tu contraseña, hacé clic en el siguiente botón:</p>
        <a href="${link}"
           style="display:inline-block;padding:10px 16px;background:#2d6cdf;color:#fff;
                  border-radius:6px;text-decoration:none;font-weight:bold;">
          Restablecer contraseña
        </a>
        <p>Este enlace expira en 1 hora.</p>
      `
    });
  } catch (err) {
    logger.error(`Error enviando correo de recuperación: ${err.message}`);
    throw err;
  }
}
