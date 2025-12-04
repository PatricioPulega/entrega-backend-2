import express from 'express';
import handlebars from 'express-handlebars';
import dotenv from 'dotenv';
import passport from 'passport';

import initializePassport from './config/passportConfig.js';
import { connectDB } from './config/db.js';   // 👈 conexión centralizada
import productRouter from './routes/products.router.js';
import cartRouter from './routes/carts.router.js';
import sessionsRouter from './routes/sessions.router.js';
import viewsRouter from './routes/viewsRouter.js';
import __dirname from './utils/constantsUtil.js';
import { errorHandler } from './middlewares/errorHandler.js';


dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

// Conexión a DB centralizada
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initializePassport();
app.use(passport.initialize());

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/../views');
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/', viewsRouter);
app.use(errorHandler);


// Middleware de 404
app.use((req, res) => {
  res.status(404).render('notFound', {
    title: '404',
    style: 'index.css'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor activo en puerto ${PORT}`);
});
