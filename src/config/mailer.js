import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();


export const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST || 'smtp.gmail.com',
  port: process.env.MAIL_PORT || 587,
  secure: false, 
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});


export const sendMail = async ({ to, subject, html }) => {
  try {
    const info = await transporter.sendMail({
      from: `"Backend II" <${process.env.MAIL_USER}>`,
      to,
      subject,
      html
    });
    console.log('📧 Email enviado:', info.messageId);
    return { success: true, id: info.messageId };
  } catch (error) {
    console.error('❌ Error enviando email:', error);
    throw error;
  }
};