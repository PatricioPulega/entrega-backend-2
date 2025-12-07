import express from 'express';
import handlebars from 'express-handlebars';
import dotenv from 'dotenv';
import passport from 'passport';
import helmet from 'helmet';
import cors from 'cors';
import initWebSocket from './websocket.js';

import initializePassport from './config/passportConfig.js';
import { connectDB } from './config/db.js';
import productRouter from './routes/products.router.js';
import cartRouter from './routes/carts.router.js';
import usersRouter from './routes/users.router.js';
import ticketsRouter from './routes/tickets.router.js';
import sessionsRouter from './routes/sessions.router.js';
import viewsRouter from './routes/views.router.js';
import __dirname from './utils/constantsUtil.js';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

// Conexión a DB centralizada
connectDB().then(() => console.log('✅ DB conectada'));

// Middlewares globales
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());

// Passport
initializePassport();
app.use(passport.initialize());

// Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/../views');
app.set('view engine', 'handlebars');

// Static files
app.use(express.static('public'));

// Routers
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/api/users', usersRouter);
app.use('/api/tickets', ticketsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/', viewsRouter);

// Middleware de 404
app.use((req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(404).json({ status: 'error', error: 'Ruta no encontrada' });
  }
  res.status(404).render('notFound', { title: '404', style: 'index.css' });
});

// Error handler global
app.use(errorHandler);


const httpServer = app.listen(PORT, () => {
  console.log(`🚀 Servidor activo en puerto ${PORT}`);
});

initWebSocket(httpServer);
